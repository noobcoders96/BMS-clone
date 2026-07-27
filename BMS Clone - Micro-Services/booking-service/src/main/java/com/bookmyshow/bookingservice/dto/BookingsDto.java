package com.bookmyshow.bookingservice.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingsDto {

    private String bookingId;
    private String movieTitle;
    private LocalDateTime showTime;
    private List<String>seats;
    private double amount;
    private String status;
    private String theatreName;
}
