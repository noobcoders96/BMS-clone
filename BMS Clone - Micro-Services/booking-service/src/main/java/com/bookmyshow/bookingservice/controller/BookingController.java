package com.bookmyshow.bookingservice.controller;

import java.util.List;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookmyshow.bookingservice.Exception.NoBookingFoundException;
import com.bookmyshow.bookingservice.dto.BookingsDto;
import com.bookmyshow.bookingservice.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;
    BookingController(BookingService bookingService){
        this.bookingService=bookingService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingsDto>> getAllBookingsByUser(@PathVariable("userId")String userId) throws NoBookingFoundException{
        return  ResponseEntity.ok(bookingService.getAllBookingsByUserId(userId));
    }
    
}
