package com.bookmyshow.theatreservice.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SeatRowDto {

    private String row;
    private List<SeatDto> seats;
}