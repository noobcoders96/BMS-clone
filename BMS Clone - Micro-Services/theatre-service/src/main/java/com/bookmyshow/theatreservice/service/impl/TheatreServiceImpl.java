package com.bookmyshow.theatreservice.service.impl;

import com.bookmyshow.theatreservice.client.CatalogClient;
import com.bookmyshow.theatreservice.dto.SeatDto;
import com.bookmyshow.theatreservice.dto.SeatRowDto;
import com.bookmyshow.theatreservice.dto.ShowResponse;
import com.bookmyshow.theatreservice.entity.Seat;
import com.bookmyshow.theatreservice.entity.Show;
import com.bookmyshow.theatreservice.exception.ResourceNotFoundException;
import com.bookmyshow.theatreservice.repository.SeatRepository;
import com.bookmyshow.theatreservice.repository.ShowRepository;
import com.bookmyshow.theatreservice.service.TheatreService;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
            throw new ResourceNotFoundException(
                    "Movie not found with id: " + movieId);
        }

        List<Show> shows = showRepository.findByMovieId(movieId);

        log.info("Found {} shows", shows.size());

        return shows.stream()
                .map(show -> ShowResponse.builder()
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

        Show show = showRepository.findById(showId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Show not found with id: " + showId));

        List<Seat> seats = seatRepository.findByShowShowId(show.getShowId());

        if (seats.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No seats available for show id: " + showId);
        }

        Map<String, List<Seat>> groupedSeats = seats.stream()
                .collect(Collectors.groupingBy(Seat::getSeatRow));

        return groupedSeats.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByKey())
                .map(entry -> SeatRowDto.builder()
                        .row(entry.getKey())
                        .seats(entry.getValue()
                                .stream()
                                .sorted(Comparator.comparing(Seat::getSeatNumber))
                                .map(seat -> SeatDto.builder()
                                        .seatId(seat.getSeatId())
                                        .status(seat.getStatus())
                                        .tier(seat.getTier())
                                        .build())
                                .toList())
                        .build())
                .toList();
    }
}