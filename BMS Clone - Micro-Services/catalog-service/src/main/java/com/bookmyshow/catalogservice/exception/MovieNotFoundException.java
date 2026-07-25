package com.bookmyshow.catalogservice.exception;

public class MovieNotFoundException extends RuntimeException{
    public MovieNotFoundException(String message)
    {
        super(message);
    }
}
