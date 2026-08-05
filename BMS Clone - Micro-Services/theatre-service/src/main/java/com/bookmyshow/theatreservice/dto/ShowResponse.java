package com.bookmyshow.theatreservice.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShowResponse {

  private String showId;

  private String theatreName;

  private String screenName;

  private LocalDateTime showTime;

  private BigDecimal price;
}
