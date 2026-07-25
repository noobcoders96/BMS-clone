package com.bookmyshow.catalogservice.service.impl;

import com.bookmyshow.catalogservice.entity.Catalog;
import com.bookmyshow.catalogservice.repository.CatalogRepository;
import com.bookmyshow.catalogservice.service.CatalogService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatalogServiceImpl implements CatalogService {

    private final CatalogRepository movieRepository;

    public CatalogServiceImpl(CatalogRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    public Catalog addMovie(Catalog movie) {
        return movieRepository.save(movie);
    }

    @Override
    public List<Catalog> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public Catalog getMovieById(String movieId) {
        return movieRepository.findById(movieId).orElse(null);
    }

    @Override
    public Catalog updateMovie(String movieId, Catalog movie) {

        Catalog existingMovie = movieRepository.findById(movieId).orElse(null);
        if (existingMovie != null) {
            existingMovie.setTitle(movie.getTitle());
            existingMovie.setLanguage(movie.getLanguage());
            existingMovie.setGenre(movie.getGenre());
            existingMovie.setDurationMins(movie.getDurationMins());
            existingMovie.setRating(movie.getRating());
            existingMovie.setPosterUrl(movie.getPosterUrl());
            existingMovie.setDescription(movie.getDescription());
            existingMovie.setCasts(movie.getCasts());

            return movieRepository.save(existingMovie);
        }

        return null;
        }

    @Override
    public void deleteMovie(String movieId) {
        movieRepository.deleteById(movieId);
    }

}
