package com.bookmyshow.theatreservice.controller;

import com.bookmyshow.theatreservice.dto.ShowResponse;
import com.bookmyshow.theatreservice.service.TheatreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shows")
@RequiredArgsConstructor
public class TheatreController {

    private final TheatreService theatreService;

    @GetMapping
    public List<ShowResponse> getShowsByMovie(
            @RequestParam String movieId) {

        return theatreService.getShowsByMovie(movieId);
    }

}
