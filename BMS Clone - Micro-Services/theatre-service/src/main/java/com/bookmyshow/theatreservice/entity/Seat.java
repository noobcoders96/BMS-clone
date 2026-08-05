package com.bookmyshow.theatreservice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.*;

@Entity
@Table(name = "seats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seat {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String seatId;

  @Column(nullable = false)
  private String seatRow;

  @Column(nullable = false)
  private Integer seatNumber;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private SeatTier tier;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private SeatStatus status;

  @Version
  @Column(nullable = false)
  private Long version;

  @Column(name = "locked_by")
  private String lockedBy;

  @Column(name = "locked_at")
  private LocalDateTime lockedAt;

  @Column(name = "lock_expires_at")
  private LocalDateTime lockExpiresAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "show_id", nullable = false)
  private Show show;
}
