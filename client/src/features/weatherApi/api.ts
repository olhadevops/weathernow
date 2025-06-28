import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../constants";

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
