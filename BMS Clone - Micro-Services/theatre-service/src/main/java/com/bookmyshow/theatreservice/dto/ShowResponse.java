package com.bookmyshow.theatreservice.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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