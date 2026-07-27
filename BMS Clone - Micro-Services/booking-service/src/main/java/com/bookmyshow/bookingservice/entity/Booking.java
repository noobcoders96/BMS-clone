package com.bookmyshow.bookingservice.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="bookings")
public class Booking {

    @Id
    private String bookingId;
    private String userId;
    private String movieTitle;
    private LocalDateTime showTime;
    private List<String>seats;
    private double amount;
    private String status;
    private String theatreName;

    
}
