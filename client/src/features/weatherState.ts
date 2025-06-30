import { createSlice } from "@reduxjs/toolkit";
import { countries } from "../data/countries";
import { ForecastData } from "../types/forecast";
import { WeatherData } from "../types/weather-app";
import { fetchForecast, fetchWeather } from "./weatherApi";
import {
  deleteSettings,
  fetchCreateSettings,
  fetchListSettings,
} from "./weatherApi/api";

interface WeatherState {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  selectedCountry: string;
  selectedCity: string;
  availableCities: string[];
  availableLocations: { id: number; country: string; city: string }[];
  loading: boolean;
  forecastLoading: boolean;
  error: string | null;
}

// Initialize with Ukraine and Kyiv as defaults
const initialState: WeatherState = {
  weatherData: null,
  forecastData: null,
  selectedCountry: "",
  selectedCity: "",
  availableCities: [],
  availableLocations: [],
  loading: false,
  forecastLoading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    setAvailableCities: (state, action) => {
      state.availableCities = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch weather";
        state.weatherData = null;
      })
      .addCase(fetchForecast.pending, (state) => {
        state.forecastLoading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecastLoading = false;
        console.log("fetchForecast action.payload", action.payload);
        state.forecastData = action.payload;
        state.error = null;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.forecastLoading = false;
        console.error("fetchForecast fetch failed:", action.error.message);
        state.error = action.error.message || "Failed to fetch forecast";
        state.forecastData = null;
      })
      .addCase(fetchCreateSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreateSettings.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchCreateSettings.rejected, (state, action) => {
        state.loading = false;
        console.error("Create Settings fetch failed:", action.error.message);
      })
      .addCase(fetchListSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.availableLocations = action.payload;
        state.error = null;
      })
      .addCase(fetchListSettings.rejected, (state, action) => {
        state.loading = false;
        state.availableLocations = [];
        state.error = action.error.message || "Failed to fetch list settings";
        state.availableLocations = [];
      })
      .addCase(deleteSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSettings.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSettings.rejected, (state, action) => {
        state.loading = false;
        console.error("Delete Settings fetch failed:", action.error.message);
      });
  },
});

export const {
  setSelectedCountry,
  setSelectedCity,
  setAvailableCities,
  clearError,
} = weatherSlice.actions;
export default weatherSlice.reducer;
