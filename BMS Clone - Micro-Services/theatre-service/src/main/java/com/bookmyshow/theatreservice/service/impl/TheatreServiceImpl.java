package com.bookmyshow.theatreservice.service.impl;

import com.bookmyshow.theatreservice.client.CatalogClient;
import com.bookmyshow.theatreservice.dto.*;
import com.bookmyshow.theatreservice.entity.Seat;
import com.bookmyshow.theatreservice.entity.SeatStatus;
import com.bookmyshow.theatreservice.entity.Show;
import com.bookmyshow.theatreservice.exception.ResourceNotFoundException;
import com.bookmyshow.theatreservice.exception.SeatAlreadyLockedException;
import com.bookmyshow.theatreservice.repository.SeatRepository;
import com.bookmyshow.theatreservice.repository.ShowRepository;
import com.bookmyshow.theatreservice.service.TheatreService;
import feign.FeignException;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TheatreServiceImpl implements TheatreService {

  private final ShowRepository showRepository;
  private final SeatRepository seatRepository;
  private final CatalogClient catalogClient;

  @Override
  public List<ShowResponse> getShowsByMovie(String movieId) {

    log.info("Fetching shows for movieId: {}", movieId);

    // Validate movie exists
    try {
      catalogClient.getMovieById(movieId);
    } catch (FeignException.NotFound ex) {
      throw new ResourceNotFoundException("Movie not found with id: " + movieId);
    }

    List<Show> shows = showRepository.findByMovieId(movieId);

    log.info("Found {} shows", shows.size());

    return shows.stream()
        .map(
            show ->
                ShowResponse.builder()
                    .showId(show.getShowId())
                    .theatreName(show.getScreen().getTheatre().getName())
                    .screenName(show.getScreen().getScreenName())
                    .showTime(show.getShowTime())
                    .price(show.getPrice())
                    .build())
        .toList();
  }

  @Override
  public List<SeatRowDto> getSeatLayout(String showId) {

    log.info("Fetching seat layout for showId: {}", showId);

    Show show =
        showRepository
            .findById(showId)
            .orElseThrow(() -> new ResourceNotFoundException("Show not found with id: " + showId));

    List<Seat> seats = seatRepository.findByShowShowId(show.getShowId());

    if (seats.isEmpty()) {
      throw new ResourceNotFoundException("No seats available for show id: " + showId);
    }

    Map<String, List<Seat>> groupedSeats =
        seats.stream().collect(Collectors.groupingBy(Seat::getSeatRow));

    return groupedSeats.entrySet().stream()
        .sorted(Map.Entry.comparingByKey())
        .map(
            entry ->
                SeatRowDto.builder()
                    .row(entry.getKey())
                    .seats(
                        entry.getValue().stream()
                            .sorted(Comparator.comparing(Seat::getSeatNumber))
                            .map(
                                seat ->
                                    SeatDto.builder()
                                        .seatId(seat.getSeatId())
                                        .status(seat.getStatus())
                                        .tier(seat.getTier())
                                        .build())
                            .toList())
                    .build())
        .toList();
  }

  @Transactional
  @Override
  public LockSeatResponse lockSeats(String showId, LockSeatRequest request) {

    log.info("Locking seats {} for show {}", request.getSeatIds(), showId);

    // Validate show exists
    showRepository
        .findById(showId)
        .orElseThrow(() -> new ResourceNotFoundException("Show not found with id: " + showId));

    List<Seat> seats = seatRepository.findAllById(request.getSeatIds());

    if (seats.size() != request.getSeatIds().size()) {
      throw new ResourceNotFoundException("One or more seats not found.");
    }

    LocalDateTime now = LocalDateTime.now();

    // Validate all seats
    for (Seat seat : seats) {

      // Seat belongs to requested show
      if (!seat.getShow().getShowId().equals(showId)) {
        throw new ResourceNotFoundException(
            "Seat " + seat.getSeatId() + " does not belong to show " + showId);
      }

      // Release expired lock automatically
      if (seat.getStatus() == SeatStatus.LOCKED
          && seat.getLockExpiresAt() != null
          && seat.getLockExpiresAt().isBefore(now)) {

        log.info("Expired lock released for seat {}", seat.getSeatId());

        seat.setStatus(SeatStatus.AVAILABLE);
        seat.setLockedBy(null);
        seat.setLockedAt(null);
        seat.setLockExpiresAt(null);
      }

      // Seat already booked
      if (seat.getStatus() == SeatStatus.BOOKED) {
        throw new SeatAlreadyLockedException("Seat already booked: " + seat.getSeatId());
      }

      // Seat currently locked
      if (seat.getStatus() == SeatStatus.LOCKED) {
        throw new SeatAlreadyLockedException("Seat already locked: " + seat.getSeatId());
      }
    }

    // Lock seats for 5 minutes
    for (Seat seat : seats) {

      seat.setStatus(SeatStatus.LOCKED);
      seat.setLockedBy(request.getUserId());
      seat.setLockedAt(now);
      seat.setLockExpiresAt(now.plusMinutes(5));
    }

    seatRepository.saveAll(seats);

    log.info("{} seats locked successfully until {}", seats.size(), now.plusMinutes(1));

    return LockSeatResponse.builder().locked(true).lockExpiresInSeconds(300).build();
  }
}
