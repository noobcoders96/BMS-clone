package com.bookmyshow.theatreservice.dto;

import lombok.Data;

@Data
public class MovieResponse {

  private String movieId;
  private String title;
  private String language;
  private String genre;
  private Integer durationMins;
  private Double rating;
  private String posterUrl;
  private String description;
  private String casts;
}
