import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {API_BASE_URL} from "../constants";

interface WeatherState {
    city: string;
    country: string;
    temperature: number | null;
    humidity: number | null;
    weather: string;
    loading?: boolean;
    error?: string | null;
}

const initialState: WeatherState = {
    city: "Kyiv",
    country: "Ukraine",
    temperature: null,
    humidity: null,
    weather: "",
    loading: false,
    error: null,
};

export const fetchWeather = createAsyncThunk(
    "weather/fetchWeather",
    async ({ city, country }: { city: string; country: string }) => {
        const response = await axios.get(
            `${API_BASE_URL}/weather-api?city=${city}&country=${country}`
        );
        return response.data;
    }
);


const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setCountry: (state, action) => {
            state.country = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action: {payload: any}) => {
                state.loading = false;
                state.temperature = action.payload.temperature;
                state.humidity = action.payload.humidity;
                state.weather = action.payload.weather;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch weather";
            });
    },
});

export const { setCity, setCountry } = weatherSlice.actions;
export default weatherSlice.reducer;