package com.bookmyshow.theatreservice.repository;

import com.bookmyshow.theatreservice.entity.Seat;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat, String> {

  List<Seat> findByShowShowId(String showId);
}
