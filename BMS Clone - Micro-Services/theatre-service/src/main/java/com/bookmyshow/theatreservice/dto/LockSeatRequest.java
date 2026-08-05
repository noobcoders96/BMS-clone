package com.bookmyshow.theatreservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import lombok.Data;

@Data
public class LockSeatRequest {

  @NotEmpty(message = "Seat IDs cannot be empty")
  private List<String> seatIds;

  @NotBlank(message = "User ID is required")
  private String userId;
}
