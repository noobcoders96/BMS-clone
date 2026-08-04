package com.bookmyshow.theatreservice.repository;

import com.bookmyshow.theatreservice.entity.Show;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ShowRepository extends JpaRepository<Show, String> {

    List<Show> findByMovieId(String movieId);

    @Query(value = "SELECT * FROM shows", nativeQuery = true)
    List<Show> findAllNative();
}