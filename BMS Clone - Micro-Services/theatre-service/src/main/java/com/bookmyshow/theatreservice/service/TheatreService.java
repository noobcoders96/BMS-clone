package com.bookmyshow.theatreservice.service;

import com.bookmyshow.theatreservice.dto.LockSeatRequest;
import com.bookmyshow.theatreservice.dto.LockSeatResponse;
import com.bookmyshow.theatreservice.dto.SeatRowDto;
import com.bookmyshow.theatreservice.dto.ShowResponse;
import java.util.List;

public interface TheatreService {

  List<ShowResponse> getShowsByMovie(String movieId);

  List<SeatRowDto> getSeatLayout(String showId);

  LockSeatResponse lockSeats(String showId, LockSeatRequest request);
}
