package com.bookmyshow.theatreservice.scheduler;

import com.bookmyshow.theatreservice.entity.Seat;
import com.bookmyshow.theatreservice.entity.SeatStatus;
import com.bookmyshow.theatreservice.repository.SeatRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SeatLockScheduler {

  private final SeatRepository seatRepository;

  @Scheduled(fixedRate = 60000)
  public void releaseExpiredLocks() {

    List<Seat> seats = seatRepository.findAll();

    boolean updated = false;

    for (Seat seat : seats) {

      if (seat.getStatus() == SeatStatus.LOCKED
          && seat.getLockExpiresAt() != null
          && seat.getLockExpiresAt().isBefore(LocalDateTime.now())) {

        seat.setStatus(SeatStatus.AVAILABLE);
        seat.setLockedBy(null);
        seat.setLockedAt(null);
        seat.setLockExpiresAt(null);

        updated = true;

        log.info("Released expired lock for seat {}", seat.getSeatId());
      }
    }

    if (updated) {
      seatRepository.saveAll(seats);
    }
  }
}
