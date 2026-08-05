package com.bookmyshow.theatreservice.repository;

import com.bookmyshow.theatreservice.entity.Show;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowRepository extends JpaRepository<Show, String> {

  List<Show> findByMovieId(String movieId);
}
