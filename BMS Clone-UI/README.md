# BookMyShow Clone — Dummy Frontend

A clickable React frontend for the full booking flow (browse movies → pick showtime →
select seats → pay → view bookings), wired to **dummy data** so it works with zero
backend. Every place you'll plug in a real microservice endpoint is marked with a
`🔌 PLUG IN HERE` comment.

## Run it

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

To build for production:
```bash
npm run build
npm run preview
```

## Where to plug in your real backend

1. Open `src/api/config.js` and flip `USE_DUMMY_DATA` to `false`, and set
   `GATEWAY_BASE_URL` to your API Gateway's URL.
2. Every file in `src/api/` (`movieApi.js`, `showApi.js`, `bookingApi.js`,
   `authApi.js`) has the dummy branch and the real `fetch(...)` call already
   written for you — the real call is currently unreachable code, just there
   as a template. Once `USE_DUMMY_DATA` is `false` it activates automatically.
3. Every real call goes through the **API Gateway**, never directly to a
   microservice — see `src/api/config.js`'s header comment for the routing
   table.

## File map

```
src/
  api/            <- all HTTP calls live here (dummy + real, see above)
  data/           <- dummy JSON matching real response shapes
  components/     <- Navbar
  pages/          <- Home, MovieDetail, SeatSelection, Payment, MyBookings, Login
  App.jsx         <- routes
  index.css       <- all styling (cinema/marquee theme)
```

## Pair this with

`bookmyshow_microservices_requirements.xlsx` — the requirements doc with every
microservice, endpoint, request/response schema, sync vs async communication
matrix, resilience patterns, and a day-by-day build order for a 10-day build.
