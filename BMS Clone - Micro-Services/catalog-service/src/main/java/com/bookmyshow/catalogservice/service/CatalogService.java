package com.bookmyshow.catalogservice.service;

import com.bookmyshow.catalogservice.entity.Catalog;

import java.util.List;

public interface CatalogService {
    default Catalog addMovie(Catalog movie) {
        throw new UnsupportedOperationException("Not implemented");
    }
    List<Catalog> getAllMovies();
    Catalog getMovieById(String movieId);
    default Catalog updateMovie(String movieId, Catalog movie) {
        throw new UnsupportedOperationException("Not implemented");
    }
    default void deleteMovie(String movieId) {
        throw new UnsupportedOperationException("Not implemented");
    }
}