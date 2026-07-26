import axios from "axios";
import { ENDPOINTS, USE_DUMMY_DATA } from "./config";
import { DUMMY_MOVIES } from "../data/dummyData";

const fakeDelay = (ms = 400) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Get all movies
export const fetchMovies = async () => {
  try {
    if (USE_DUMMY_DATA) {
      await fakeDelay();
      return DUMMY_MOVIES;
    }

    const { data } = await axios.get(ENDPOINTS.MOVIES);
    return data;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
};

// Get movie by ID
export const fetchMovieById = async (movieId) => {
  try {
    if (USE_DUMMY_DATA) {
      await fakeDelay();
      return DUMMY_MOVIES.find((movie) => movie.movieId === movieId);
    }

    const { data } = await axios.get(ENDPOINTS.MOVIE_DETAIL(movieId));
    return data;
  } catch (error) {
    console.error(`Failed to fetch movie ${movieId}:`, error);
    throw error;
  }
};