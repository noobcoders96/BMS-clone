package com.bookmyshow.catalogservice.controller;

import com.bookmyshow.catalogservice.entity.Catalog;
import com.bookmyshow.catalogservice.service.CatalogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class CatalogController {

    private final CatalogService movieService;

    public CatalogController(CatalogService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<Catalog> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/{movieId}")
    public Catalog getMovieById(@PathVariable String movieId) {
        return movieService.getMovieById(movieId);
    }
}