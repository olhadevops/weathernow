import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL, USER_ID } from "../../constants";

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

      // await new Promise((resolve) => setTimeout(resolve, 1000));
      //
      // return {
      //   name: city,
      //   sys: {
      //     country: countryCode,
      //   },
      // };

      throw error;
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

      // await new Promise((resolve) => setTimeout(resolve, 800));

      // return {
      //   city: {
      //     name: city,
      //     country: countryCode,
      //   },
      // };

      throw error;
    }
  },
);

export const fetchCreateSettings = createAsyncThunk(
  "settings/create",
  async ({ city, country }: { city: string; country: string }) => {
    try {
      console.log("Fetching settings for:", city, country);

      const response = await axios.post(`${API_BASE_URL}/settings`, {
        city,
        country,
        user_id: USER_ID,
      });
      console.log("Settings API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Settings API call failed, using mock data:", error);

      throw error;
      // await new Promise((resolve) => setTimeout(resolve, 800));

      // return {
      //   city: {
      //     name: city,
      //     country: country,
      //   },
      // };
    }
  },
);

export const fetchListSettings = createAsyncThunk("settings/list", async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/settings`);
    console.log("List Settings API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("List Settings API call failed, using mock data:", error);

    // await new Promise((resolve) => setTimeout(resolve, 800));
    //
    // return {
    //   city: {
    //     name: city,
    //     country: countryCode,
    //   },
    // };

    throw error;
  }
});

export const deleteSettings = createAsyncThunk(
  "settings/delete",
  async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/settings/${id}`);
      console.log("Delete Settings API response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Delete Settings API call failed, using mock data:", error);

      // await new Promise((resolve) => setTimeout(resolve, 800));
      //
      // return {
      //   city: {
      //     name: city,
      //     country: countryCode,
      //   },
      // };

      throw error;
    }
  },
);
