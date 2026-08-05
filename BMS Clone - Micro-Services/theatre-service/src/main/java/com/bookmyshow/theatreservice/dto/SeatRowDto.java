package com.bookmyshow.theatreservice.dto;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SeatRowDto {

  private String row;
  private List<SeatDto> seats;
}
