package com.bookmyshow.theatreservice.controller;

import com.bookmyshow.theatreservice.dto.SeatRowDto;
import com.bookmyshow.theatreservice.dto.ShowResponse;
import com.bookmyshow.theatreservice.service.TheatreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/shows")
@RequiredArgsConstructor
public class TheatreController {

    private final TheatreService theatreService;

    /**
     * Get all available shows for a movie
     *
     * Example:
     * GET /api/shows?movieId=66666666-6666-6666-6666-666666666666
     */
    @GetMapping
    public List<ShowResponse> getShowsByMovie(@RequestParam String movieId) {

        log.info("Fetching shows for movieId: {}", movieId);

        return theatreService.getShowsByMovie(movieId);
    }

    /**
     * Get seat layout for a show
     *
     * Example:
     * GET /api/shows/{showId}/seats
     */
    @GetMapping("/{showId}/seats")
    public List<SeatRowDto> getSeatLayout(@PathVariable String showId) {

        log.info("Fetching seat layout for showId: {}", showId);

        return theatreService.getSeatLayout(showId);
    }
}