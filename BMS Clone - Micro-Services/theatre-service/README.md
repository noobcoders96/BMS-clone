# 🎭 Theatre Service

The Theatre Service manages theatres, screens, movie showtimes, seat layouts, and seat availability for the BookMyShow Clone Microservices Application.

---

# 🏗️ Architecture

```
                 +------------------+
                 |  Catalog Service |
                 +------------------+
                          ▲
                          │ (Feign Client)
                          │
+------------+      +------------------+      +----------------+
|  Frontend  | ---> | Theatre Service  | ---> | PostgreSQL DB  |
+------------+      +------------------+      +----------------+
```

---

# 📦 Database ER Diagram

```text
                     THEATRES
+------------------------------------------------+
| theatre_id (PK)                                |
| name                                           |
| city                                           |
| address                                        |
+------------------------------------------------+
                 |
                 | 1
                 |
                 | *
                 ▼
                     SCREENS
+------------------------------------------------+
| screen_id (PK)                                 |
| screen_name                                    |
| capacity                                       |
| theatre_id (FK) -------------------------------+
+------------------------------------------------+
                 |
                 | 1
                 |
                 | *
                 ▼
                      SHOWS
+------------------------------------------------+
| show_id (PK)                                   |
| movie_id                                       |
| show_time                                      |
| price                                          |
| screen_id (FK) --------------------------------+
+------------------------------------------------+
                 |
                 | 1
                 |
                 | *
                 ▼
                      SEATS
+------------------------------------------------+
| seat_id (PK)                                   |
| seat_row                                       |
| seat_number                                    |
| tier                                           |
| status                                         |
| show_id (FK) ----------------------------------+
+------------------------------------------------+
```

---

# 🔗 Entity Relationship Mapping

## Theatre → Screen

One theatre contains multiple screens.

```java
@OneToMany(mappedBy = "theatre")
private List<Screen> screens;
```

```java
@ManyToOne
@JoinColumn(name = "theatre_id")
private Theatre theatre;
```

Relationship

```
Theatre (1) --------> (*) Screen
```

---

## Screen → Show

One screen can have multiple movie shows.

```java
@OneToMany(mappedBy = "screen")
private List<Show> shows;
```

```java
@ManyToOne
@JoinColumn(name = "screen_id")
private Screen screen;
```

Relationship

```
Screen (1) --------> (*) Show
```

---

## Show → Seat

One show contains multiple seats.

```java
@OneToMany(mappedBy = "show")
private List<Seat> seats;
```

```java
@ManyToOne
@JoinColumn(name = "show_id")
private Show show;
```

Relationship

```
Show (1) --------> (*) Seat
```

---

# 📚 Hibernate & JPA Concepts Used

## @Entity

Marks a Java class as a database table.

```java
@Entity
```

---

## @Table

Maps the entity to a table.

```java
@Table(name = "shows")
```

---

## @Id

Marks the Primary Key.

```java
@Id
private String showId;
```

---

## @GeneratedValue

Automatically generates IDs.

```java
@GeneratedValue(strategy = GenerationType.UUID)
```

---

## @Column

Maps a field to a database column.

```java
@Column(nullable = false)
private BigDecimal price;
```

---

## @ManyToOne

Many child records belong to one parent.

Examples

- Many Screens → One Theatre
- Many Shows → One Screen
- Many Seats → One Show

---

## @OneToMany

One parent has multiple child records.

Examples

- Theatre → Screens
- Screen → Shows
- Show → Seats

---

## @JoinColumn

Specifies the Foreign Key column.

```java
@JoinColumn(name = "screen_id")
```

---

## FetchType.LAZY

Loads related entities only when required.

```java
@ManyToOne(fetch = FetchType.LAZY)
```

Advantages

- Better Performance
- Reduced Memory Usage
- Faster API Responses

---

## CascadeType.ALL

Automatically propagates persistence operations.

```java
@OneToMany(
    mappedBy = "show",
    cascade = CascadeType.ALL
)
```

Operations cascaded

- Persist
- Merge
- Remove
- Refresh
- Detach

---

# 📊 Database Relationships

| Parent | Child | Relationship |
|---------|-------|--------------|
| Theatre | Screen | One-to-Many |
| Screen | Show | One-to-Many |
| Show | Seat | One-to-Many |

---

# 🌐 REST APIs

## Get Shows By Movie

```
GET /api/shows?movieId={movieId}
```

Example

```
GET /api/shows?movieId=66666666-6666-6666-6666-666666666666
```

Response

```json
[
  {
    "showId": "33333333-3333-3333-3333-333333333331",
    "theatreName": "PVR Phoenix Marketcity",
    "screenName": "Screen 1",
    "showTime": "2026-08-05T10:00:00",
    "price": 250.00
  }
]
```

---

# 🔄 Inter-Service Communication

The Theatre Service communicates synchronously with the Catalog Service using **Spring Cloud OpenFeign**.

```
Frontend
     │
     ▼
API Gateway
     │
     ▼
Theatre Service
     │
     ▼
Catalog Service
     │
     ▼
PostgreSQL
```

---

# 🚀 Upcoming Features

- Retrieve Seat Layout
- Seat Locking using Optimistic Locking
- Booking Integration
- Payment Integration
- Redis-based Seat Lock TTL
- Resilience4j Circuit Breaker
- Distributed Tracing
- Notification Service Integration

---

# 👨‍💻 Contributors

- **Karthikeyan S** – Design & Architecture
- **Kevin Harris D** – Development & Implementation