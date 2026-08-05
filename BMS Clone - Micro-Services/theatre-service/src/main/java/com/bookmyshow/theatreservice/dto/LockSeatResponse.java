package com.bookmyshow.theatreservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LockSeatResponse {

    private boolean locked;

    private Integer lockExpiresInSeconds;
}