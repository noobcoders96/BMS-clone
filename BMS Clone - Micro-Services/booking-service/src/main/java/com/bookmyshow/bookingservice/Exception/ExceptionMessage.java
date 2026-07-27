package com.bookmyshow.bookingservice.Exception;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ExceptionMessage{

    private int errorCode;
    private String path;
    private String message;

}