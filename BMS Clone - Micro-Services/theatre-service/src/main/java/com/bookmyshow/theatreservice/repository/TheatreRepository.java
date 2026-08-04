package com.bookmyshow.theatreservice.repository;

import com.bookmyshow.theatreservice.entity.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TheatreRepository extends JpaRepository<Theatre, String> {
}