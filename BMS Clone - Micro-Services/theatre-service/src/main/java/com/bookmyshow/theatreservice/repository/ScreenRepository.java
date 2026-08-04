package com.bookmyshow.theatreservice.repository;

import com.bookmyshow.theatreservice.entity.Screen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScreenRepository extends JpaRepository<Screen, String> {
}