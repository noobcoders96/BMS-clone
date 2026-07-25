// Dummy payloads shaped exactly like the real microservice responses will be.
// See the Excel requirements doc, "Endpoints" sheet, for the authoritative schema.

export const DUMMY_MOVIES = [
  {
    movieId: "mv_101",
    title: "Kaanchi: The Last Stand",
    language: "Tamil",
    genre: ["Action", "Thriller"],
    durationMins: 148,
    rating: 4.3,
    posterUrl: "https://picsum.photos/seed/kaanchi/400/560",
    description: "A retired cop is pulled back into the city's underworld for one final case.",
  },
  {
    movieId: "mv_102",
    title: "Ninaithale Inikkum 2.0",
    language: "Tamil",
    genre: ["Romance", "Drama"],
    durationMins: 132,
    rating: 4.0,
    posterUrl: "https://picsum.photos/seed/ninaithale/400/560",
    description: "Two childhood friends reunite a decade later, and everything changes.",
  },
  {
    movieId: "mv_103",
    title: "Vector Protocol",
    language: "English",
    genre: ["Sci-Fi", "Action"],
    durationMins: 141,
    rating: 4.6,
    posterUrl: "https://picsum.photos/seed/vector/400/560",
    description: "A rogue AI engineer races to stop a system she helped build.",
  },
  {
    movieId: "mv_104",
    title: "Kadhal Circuit",
    language: "Tamil",
    genre: ["Comedy", "Romance"],
    durationMins: 125,
    rating: 3.8,
    posterUrl: "https://picsum.photos/seed/kadhal/400/560",
    description: "A chaotic road trip across South India in search of one lost engagement ring.",
  },
];

export const DUMMY_SHOWS = {
  mv_101: [
    { showId: "sh_501", theatreName: "PVR Ampa Mall", screen: "Screen 3", time: "10:30 AM", price: 220 },
    { showId: "sh_502", theatreName: "PVR Ampa Mall", screen: "Screen 3", time: "6:45 PM", price: 260 },
    { showId: "sh_503", theatreName: "Rohini Silver Screens", screen: "Audi 1", time: "9:15 PM", price: 240 },
  ],
  mv_102: [
    { showId: "sh_511", theatreName: "Sathyam Cinemas", screen: "Screen 1", time: "11:00 AM", price: 200 },
    { showId: "sh_512", theatreName: "Sathyam Cinemas", screen: "Screen 1", time: "7:30 PM", price: 250 },
  ],
  mv_103: [
    { showId: "sh_521", theatreName: "PVR Ampa Mall", screen: "IMAX", time: "2:00 PM", price: 380 },
    { showId: "sh_522", theatreName: "PVR Ampa Mall", screen: "IMAX", time: "10:00 PM", price: 380 },
  ],
  mv_104: [
    { showId: "sh_531", theatreName: "Rohini Silver Screens", screen: "Audi 2", time: "1:15 PM", price: 190 },
  ],
};

// 8x10 seat grid, a few pre-booked to make the UI feel real
const BOOKED = new Set(["A3", "A4", "B5", "C7", "D1", "F8"]);
export function generateSeatLayout() {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  return rows.map((row) => ({
    row,
    seats: Array.from({ length: 10 }, (_, i) => {
      const seatId = `${row}${i + 1}`;
      return {
        seatId,
        status: BOOKED.has(seatId) ? "BOOKED" : "AVAILABLE",
        tier: row <= "C" ? "PREMIUM" : "NORMAL",
      };
    }),
  }));
}

export const DUMMY_USER = {
  userId: "usr_9001",
  name: "super-man",
  email: "karthik@example.com",
};

export const DUMMY_BOOKINGS = [
  {
    bookingId: "bk_7001",
    movieTitle: "Vector Protocol",
    theatreName: "PVR Ampa Mall",
    time: "2:00 PM, 24 Jul",
    seats: ["C4", "C5"],
    amount: 760,
    status: "CONFIRMED",
    paymentId: "pay_3001",
  },
];
