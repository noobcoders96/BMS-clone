package com.bookmyshow.catalogservice.service;

import com.bookmyshow.catalogservice.entity.Catalog;

import java.util.List;

public interface CatalogService {
    Catalog addMovie(Catalog movie);
    List<Catalog> getAllMovies();
    Catalog getMovieById(String movieId);
    Catalog updateMovie(String movieId, Catalog movie);
    void deleteMovie(String movieId);
}