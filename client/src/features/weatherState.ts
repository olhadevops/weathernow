import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import { countries } from "../data/countries";
import { ForecastData } from "../types/forecast";
import { WeatherData } from "../types/weather-app";

interface WeatherState {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  selectedCountry: string;
  selectedCity: string;
  availableCities: string[];
  loading: boolean;
  forecastLoading: boolean;
  error: string | null;
}

// Initialize with Ukraine and Kyiv as defaults
const initialState: WeatherState = {
  weatherData: null,
  forecastData: null,
  selectedCountry: "UA",
  selectedCity: "Kyiv",
  availableCities: countries.find((c) => c.code === "UA")?.cities || [],
  loading: false,
  forecastLoading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ city, countryCode }: { city: string; countryCode: string }) => {
    try {
      console.log("Fetching weather for:", city, countryCode);
      console.log("API_BASE_URL:", API_BASE_URL);

      const response = await axios.get(
        `${API_BASE_URL}/weather-api?city=${city}&country=${countryCode}`,
      );
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API call failed, using mock data:", error);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        name: city,
        sys: {
          country: countryCode,
        },
      };
    }
  },
);

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async ({ city, countryCode }: { city: string; countryCode: string }) => {
    try {
      console.log("Fetching forecast for:", city, countryCode);

      const response = await axios.get(
        `${API_BASE_URL}/weather-api/forecast?city=${city}&country=${countryCode}`,
      );
      console.log("Forecast API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Forecast API call failed, using mock data:", error);

      await new Promise((resolve) => setTimeout(resolve, 800));

      return {
        city: {
          name: city,
          country: countryCode,
        },
      };
    }
  },
);

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
    clearWeatherData: (state) => {
      state.weatherData = null;
    },
    clearForecastData: (state) => {
      state.forecastData = null;
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
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecastLoading = false;
        state.forecastData = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.forecastLoading = false;
        console.error("Forecast fetch failed:", action.error.message);
      });
  },
});

export const {
  setSelectedCountry,
  setSelectedCity,
  setAvailableCities,
  clearError,
  clearWeatherData,
  clearForecastData,
} = weatherSlice.actions;
export default weatherSlice.reducer;
