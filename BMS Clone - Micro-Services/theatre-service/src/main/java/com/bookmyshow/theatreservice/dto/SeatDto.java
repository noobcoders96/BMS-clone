package com.bookmyshow.theatreservice.dto;

import com.bookmyshow.theatreservice.entity.SeatStatus;
import com.bookmyshow.theatreservice.entity.SeatTier;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SeatDto {

    private String seatId;
    private SeatStatus status;
    private SeatTier tier;
}