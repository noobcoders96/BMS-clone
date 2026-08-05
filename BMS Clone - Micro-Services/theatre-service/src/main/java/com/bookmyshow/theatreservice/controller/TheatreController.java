package com.bookmyshow.theatreservice.controller;

import com.bookmyshow.theatreservice.dto.LockSeatRequest;
import com.bookmyshow.theatreservice.dto.LockSeatResponse;
import com.bookmyshow.theatreservice.dto.SeatRowDto;
import com.bookmyshow.theatreservice.dto.ShowResponse;
import com.bookmyshow.theatreservice.service.TheatreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/shows")
@RequiredArgsConstructor
public class TheatreController {

  private final TheatreService theatreService;

  @Operation(summary = "Get all shows for a movie")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Shows fetched successfully"),
    @ApiResponse(responseCode = "404", description = "Movie not found")
  })
  @GetMapping
  public List<ShowResponse> getShowsByMovie(@RequestParam String movieId) {

    log.info("Fetching shows for movieId: {}", movieId);

    return theatreService.getShowsByMovie(movieId);
  }

  @Operation(summary = "Get seat layout for a show")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Seat layout fetched successfully"),
    @ApiResponse(responseCode = "404", description = "Show not found")
  })
  @GetMapping("/{showId}/seats")
  public List<SeatRowDto> getSeatLayout(@PathVariable String showId) {

    log.info("Fetching seat layout for showId: {}", showId);

    return theatreService.getSeatLayout(showId);
  }

  @Operation(summary = "Lock seats for a show")
  @ApiResponses({
    @ApiResponse(responseCode = "200", description = "Seats locked successfully"),
    @ApiResponse(responseCode = "404", description = "Show or Seat not found"),
    @ApiResponse(responseCode = "409", description = "Seat already booked or locked")
  })
  @PostMapping("/{showId}/seats/lock")
  public LockSeatResponse lockSeats(
      @PathVariable String showId, @Valid @RequestBody LockSeatRequest request) {

    log.info("Lock seats request received for show {}", showId);

    return theatreService.lockSeats(showId, request);
  }
}
