package com.bookmyshow.theatreservice.repository;

import com.bookmyshow.theatreservice.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, String> {

    List<Seat> findByShowShowId(String showId);

}