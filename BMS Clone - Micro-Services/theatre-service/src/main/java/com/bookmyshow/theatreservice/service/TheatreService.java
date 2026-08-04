package com.bookmyshow.theatreservice.service;

import com.bookmyshow.theatreservice.dto.ShowResponse;

import java.util.List;

public interface TheatreService {

    List<ShowResponse> getShowsByMovie(String movieId);

}