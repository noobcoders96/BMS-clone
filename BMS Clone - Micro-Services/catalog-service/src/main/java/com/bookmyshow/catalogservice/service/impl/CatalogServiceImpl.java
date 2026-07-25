package com.bookmyshow.catalogservice.service.impl;

import com.bookmyshow.catalogservice.entity.Catalog;
import com.bookmyshow.catalogservice.exception.MovieNotFoundException;
import com.bookmyshow.catalogservice.repository.CatalogRepository;
import com.bookmyshow.catalogservice.service.CatalogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CatalogServiceImpl implements CatalogService {

    private final CatalogRepository movieRepository;

    public CatalogServiceImpl(CatalogRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    @Cacheable("movies")
    public List<Catalog> getAllMovies() {
        log.info("Fetching all movies");
        return movieRepository.findAll();
    }

    @Override
    public Catalog getMovieById(String movieId) {
        log.info("Fetching movie with id: {}", movieId);
        return movieRepository.findById(movieId).orElseThrow(() -> {
            log.warn("Movie not found with id: {}", movieId);
            return new MovieNotFoundException("Movie not found with id: " + movieId);});
    }


}
