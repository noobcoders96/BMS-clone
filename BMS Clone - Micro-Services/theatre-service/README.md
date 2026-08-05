# Theatre Service

The Theatre Service is responsible for managing theatres, screens, shows, and seats in the BookMyShow Clone microservices application. It exposes APIs to retrieve available shows, fetch seat layouts, and temporarily lock seats during the booking process.

---

## Features

- Manage theatres, screens, shows, and seats
- Retrieve all available shows for a movie
- View seat layout for a show
- Temporarily lock seats during booking (TTL)
- Automatically release expired seat locks
- Prevent concurrent seat booking using Optimistic Locking
- Validate movie existence through Catalog Service
- Global exception handling
- Swagger API documentation
- Service registration with Eureka

---

## Tech Stack

- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- PostgreSQL
- OpenFeign
- Eureka Client
- Lombok
- Spring Validation
- Spring Scheduler
- SpringDoc OpenAPI (Swagger)

---

## Architecture

```
Client
   │
   ▼
Theatre Controller
   │
   ▼
Theatre Service
   │
   ├────────► Catalog Service (Feign)
   │
   ▼
Repositories
   │
   ▼
PostgreSQL
```

---

## Database Relationship

```
Theatre (1)
     │
     │ One-To-Many
     ▼
Screen (Many)
     │
     │ One-To-Many
     ▼
Show (Many)
     │
     │ One-To-Many
     ▼
Seat (Many)
```

---

## Entity Relationship Diagram

```
+--------------------+
|      Theatre       |
+--------------------+
| theatreId (PK)     |
| name               |
| city               |
| address            |
+--------------------+
          │
          │ 1
          │
          ▼
+--------------------+
|      Screen        |
+--------------------+
| screenId (PK)      |
| screenName         |
| capacity           |
| theatre_id (FK)    |
+--------------------+
          │
          │ 1
          │
          ▼
+--------------------+
|       Show         |
+--------------------+
| showId (PK)        |
| movieId            |
| showTime           |
| price              |
| screen_id (FK)     |
+--------------------+
          │
          │ 1
          │
          ▼
+-------------------------------+
|             Seat              |
+-------------------------------+
| seatId (PK)                   |
| seatRow                       |
| seatNumber                    |
| tier                          |
| status                        |
| lockedBy                      |
| lockedAt                      |
| lockExpiresAt                 |
| version (@Version)            |
| show_id (FK)                  |
+-------------------------------+
```

---

## Hibernate Mapping

### Theatre → Screen

```
@OneToMany(mappedBy = "theatre")
```

```
@ManyToOne
@JoinColumn(name = "theatre_id")
```

---

### Screen → Show

```
@OneToMany(mappedBy = "screen")
```

```
@ManyToOne
@JoinColumn(name = "screen_id")
```

---

### Show → Seat

```
@OneToMany(mappedBy = "show")
```

```
@ManyToOne
@JoinColumn(name = "show_id")
```

---

## Optimistic Locking

The service uses Hibernate Optimistic Locking to prevent multiple users from updating the same seat simultaneously.

```
@Version
private Long version;
```

If two users attempt to lock the same seat concurrently, Hibernate throws an `ObjectOptimisticLockingFailureException`, which is handled globally and returned as **409 Conflict**.

---

## Seat Locking Flow (TTL)

```
User selects seats
        │
        ▼
Validate Show
        │
        ▼
Validate Seats
        │
        ▼
Already BOOKED?
        │
      Yes ─────► 409 Conflict
        │
      No
        ▼
Already LOCKED?
        │
      Yes
        │
        ▼
Lock Expired?
        │
     Yes
        │
Release Lock
        │
        ▼
AVAILABLE
        │
        ▼
Lock Seat
(status = LOCKED)

lockedBy
lockedAt
lockExpiresAt (+5 min)

        │
        ▼
Return Success
```

---

## Scheduler

A scheduled job periodically scans the database and releases expired seat locks.

```
@Scheduled(fixedRate = 60000)
```

Expired locks are reset to:

- AVAILABLE
- lockedBy = NULL
- lockedAt = NULL
- lockExpiresAt = NULL

---

## APIs

### Get Shows by Movie

```
GET /api/shows?movieId={movieId}
```

Returns all available shows for a movie.

---

### Get Seat Layout

```
GET /api/shows/{showId}/seats
```

Returns the grouped seat layout with current availability.

---

### Lock Seats

```
POST /api/shows/{showId}/seats/lock
```

Request

```json
{
  "seatIds": [
    "seat-id-1",
    "seat-id-2"
  ],
  "userId": "kevin"
}
```

Response

```json
{
  "locked": true,
  "lockExpiresInSeconds": 300
}
```

---

## Exception Handling

Handled globally using `@RestControllerAdvice`.

| Exception | HTTP Status |
|-----------|------------|
| ResourceNotFoundException | 404 |
| SeatAlreadyLockedException | 409 |
| ObjectOptimisticLockingFailureException | 409 |
| Validation Errors | 400 |
| Generic Exception | 500 |

---

## Logging

SLF4J logging is used throughout the application.

Example

```
Fetching shows for movieId: ...
Fetching seat layout for showId: ...
Locking seats [...]
Expired lock released for seat ...
Seats locked successfully.
```

---

## Service Communication

The Theatre Service communicates with the Catalog Service using OpenFeign to validate movie existence before retrieving available shows.

```
Theatre Service
        │
        ▼
Catalog Service
        │
        ▼
Movie Exists?
      │
   Yes │ No
      ▼
Return Shows
        │
        └────► 404 Not Found
```

---

## Testing

Implemented and verified:

- Get Shows by Movie
- Get Seat Layout
- Lock Available Seats
- Already Booked Seat
- Already Locked Seat
- Invalid Show
- Invalid Seat
- Movie Validation
- TTL Expiry
- Automatic Seat Unlock
- Optimistic Locking

---

## Future Improvements

- JWT Authentication
- Redis-based Distributed Locking
- Booking Service Integration
- Payment Service Integration
- Notification Service Integration
- Kafka Event Publishing
- Resilience4j Circuit Breaker
- Docker Support
- Flyway Database Migration

---

## Developed As Part Of

BookMyShow Clone - Microservices Architecture