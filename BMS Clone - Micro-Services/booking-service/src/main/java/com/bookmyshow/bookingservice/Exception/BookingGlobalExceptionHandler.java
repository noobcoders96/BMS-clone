package com.bookmyshow.bookingservice.Exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BookingGlobalExceptionHandler {

    @ExceptionHandler(NoBookingFoundException.class)
    public ExceptionMessage handleNoBookingFound(NoBookingFoundException nbfe){
        ExceptionMessage msg=new ExceptionMessage(404, "", nbfe.getLocalizedMessage());
        return msg;
    }
    
}
