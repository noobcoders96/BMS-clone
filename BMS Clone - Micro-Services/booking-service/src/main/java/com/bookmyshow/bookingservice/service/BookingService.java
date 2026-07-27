package com.bookmyshow.bookingservice.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.bookmyshow.bookingservice.Exception.NoBookingFoundException;
import com.bookmyshow.bookingservice.dto.BookingsDto;
import com.bookmyshow.bookingservice.entity.Booking;
import com.bookmyshow.bookingservice.repository.BookingRepository;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    BookingService(BookingRepository bookingRepository){
        this.bookingRepository=bookingRepository;
    }

    public List<BookingsDto> getAllBookingsByUserId(String userId) throws NoBookingFoundException{

        Optional<List<Booking>> bookings=bookingRepository.findAllByUserId(userId);

        List<Booking>bookingsList= bookings
        .orElseThrow(() -> new NoBookingFoundException("No bookings found for the user "+userId));

        List<BookingsDto> bookingDtoList = bookingsList.stream()
    .map(booking -> {
        BookingsDto dto = new BookingsDto();
        dto.setBookingId(booking.getBookingId());
        dto.setMovieTitle(booking.getMovieTitle());
        dto.setTheatreName(booking.getTheatreName());
        dto.setShowTime(booking.getShowTime());
        dto.setSeats(booking.getSeats());
        dto.setAmount(booking.getAmount());
        dto.setStatus(booking.getStatus());
        return dto;
    })
    .collect(Collectors.toList());
    return bookingDtoList;

        

    }

    
}
