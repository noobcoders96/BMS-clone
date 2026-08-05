package com.bookmyshow.theatreservice.client;

import com.bookmyshow.theatreservice.dto.MovieResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "CATALOG-SERVICE")
public interface CatalogClient {

  @GetMapping("/api/movies/{movieId}")
  MovieResponse getMovieById(@PathVariable String movieId);
}
