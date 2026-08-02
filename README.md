# BookMyShow Clone - Microservices

A scalable microservices-based movie ticket booking platform inspired by **BookMyShow**, built using **Spring Boot**, **Spring Cloud**, **React**, and **PostgreSQL**. The application follows a distributed architecture where each business capability is implemented as an independent microservice.

---

# Architecture

```text
                    React Frontend
                           │
                           ▼
                  Spring Cloud Gateway
                           │
      ┌──────────────┬──────────────┬──────────────┐
      ▼              ▼              ▼              ▼
 Catalog Service  Theatre Service Booking Service User Service
      │              │              │              │
      └──────────────┴──────────────┴──────────────┘
                           │
                    Payment Service
                           │
                    Notification Service
                           │
                     RabbitMQ / Kafka

                           │
                    Eureka Discovery Server
```

---

# Microservices

| Service | Port | Responsibility |
|---------|------|----------------|
| Discovery Server | 8761 | Service Discovery |
| API Gateway | 8091 | Request Routing |
| Catalog Service | 8082 | Movie Management |
| Theatre Service | 8083 | Theatre, Screens, Shows & Seats |
| Booking Service | 8084 | Ticket Booking |
| User Service | 8085 | Authentication & Users |
| Payment Service | 8086 | Payment Processing |
| Notification Service | 8087 | Notifications |

---

# Technology Stack

## Backend

- Java 17
- Spring Boot
- Spring Cloud
- Spring Data JPA
- Spring Cloud Gateway
- Spring Cloud Eureka
- Spring Cloud OpenFeign
- PostgreSQL
- Maven
- Lombok
- Swagger / OpenAPI

## Frontend

- React
- Vite
- React Router
- Axios
- React Loading Skeleton

## DevOps

- Docker
- Docker Compose

## Future Enhancements

- Redis
- RabbitMQ / Kafka
- ELK Stack
- Resilience4j
- Zipkin
- Prometheus
- Grafana

---

# Features

## Discovery Server

- Service Registration
- Service Discovery

## API Gateway

- Dynamic Routing
- Load Balancing
- CORS Configuration
- Centralized API Entry Point

## Catalog Service

- Add Movies
- View All Movies
- View Movie by ID
- Global Exception Handling
- Caching
- SLF4J Logging
- Swagger Documentation
- JUnit & Mockito Tests

## Theatre Service

- Manage Theatres
- Manage Screens
- Manage Shows
- Retrieve Shows by Movie
- Seat Layout
- Seat Locking *(In Progress)*

## Frontend

- Home Page
- Movie Details
- Seat Selection
- Skeleton Loaders
- API Gateway Integration
- Dummy Data Support

---

# Project Structure

```text
BookMyShow-Clone
│
├── discovery-server
├── api-gateway
├── catalog-service
├── theatre-service
├── booking-service
├── payment-service
├── notification-service
├── user-service
└── frontend
```

---

# Service Communication

```text
Frontend
    │
    ▼
API Gateway
    │
    ▼
Microservices
    │
    ▼
PostgreSQL
```

Inter-service communication is implemented using **OpenFeign**.

---

# Databases

Each microservice owns its own database.

| Service | Database |
|---------|----------|
| Catalog Service | catalog_db |
| Theatre Service | theatre_db |
| Booking Service | booking_db |
| User Service | user_db |
| Payment Service | payment_db |

---

# Running the Application

Start the services in the following order:

1. PostgreSQL
2. Discovery Server
3. API Gateway
4. Catalog Service
5. Theatre Service
6. Remaining Microservices
7. React Frontend

---

# API Documentation

Swagger UI

```text
Catalog Service
http://localhost:8082/swagger-ui.html
```

```text
Theatre Service
http://localhost:8083/swagger-ui.html
```

---

# Concepts Demonstrated

- Microservices Architecture
- Service Discovery
- API Gateway
- REST APIs
- DTO Mapping
- Global Exception Handling
- SLF4J Logging
- Spring Cache
- OpenFeign
- JPA Relationships
- Optimistic Locking
- Saga Pattern
- Circuit Breaker
- Retry Mechanism
- Centralized Logging
- Distributed Tracing
- Unit Testing
- Docker Containerization

---

# Development Roadmap

- ✅ Discovery Server
- ✅ API Gateway
- ✅ Catalog Service
- 🚧 Theatre Service
- ⏳ Booking Service
- ⏳ Payment Service
- ⏳ Notification Service
- ⏳ JWT Authentication
- ⏳ Seat Locking
- ⏳ Redis Integration
- ⏳ RabbitMQ / Kafka
- ⏳ ELK Stack
- ⏳ Docker Compose
- ⏳ Kubernetes

---

# Future Improvements

- JWT Authentication
- Role-Based Authorization
- Redis-based Seat Locking
- Kafka Event Streaming
- Payment Gateway Integration
- Email & SMS Notifications
- ELK Observability
- Prometheus & Grafana Monitoring
- CI/CD Pipeline
- Kubernetes Deployment

---

# Authors

Developed by:

- **Karthikeyan S** **&** **Kevin Harris D**

This project was built as a collaborative learning initiative to explore microservices architecture using Spring Boot, Spring Cloud, React, PostgreSQL, and modern distributed system design principles.
**Kevin Harris D**

A learning-focused microservices project inspired by BookMyShow, demonstrating Spring Boot, Spring Cloud, React, distributed system design, and cloud-native application development.
