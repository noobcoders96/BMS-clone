package com.bookmyshow.catalogservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "catalog")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Catalog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String movieId;
    private String title;
    private String language;
    private String genre;
    private Integer durationMins;
    private Double rating;
    private String posterUrl;
    @Column(length = 1000)
    private String description;
    private String casts;
}