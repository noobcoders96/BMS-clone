package com.bookmyshow.theatreservice.exception;

public class SeatAlreadyLockedException extends RuntimeException {

  public SeatAlreadyLockedException(String message) {
    super(message);
  }
}
