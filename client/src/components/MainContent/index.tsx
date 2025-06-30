"use client";

import type React from "react";
import { Box } from "@mui/material";
import WeatherApp from "../WeatherApp";
import WeatherForecast from "../WeatherForecast";
import { WeatherData } from "../../types/weather-app";
import { ForecastData } from "../../types/forecast";

interface MainContentProps {
  isLoading: boolean;
  isForecastLoading: boolean;
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
}

export default function MainContent({
  weatherData,
  forecastData,
  isLoading,
  isForecastLoading,
}: MainContentProps) {
  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Weather Results */}
      {!isLoading && Boolean(weatherData?.main?.temp) && (
        <Box sx={{ animation: "fadeIn 0.5s ease-in", mb: 3 }}>
          <WeatherApp data={weatherData!} />
        </Box>
      )}

      {!isLoading && Boolean(weatherData?.main?.temp) === false && (
        <Box display="flex" justifyContent="center">
          Nothing found
        </Box>
      )}

      {/* Forecast Results */}
      {Boolean(forecastData?.list?.length) && !isForecastLoading && (
        <Box sx={{ animation: "fadeIn 0.5s ease-in" }}>
          <WeatherForecast data={forecastData!} />
        </Box>
      )}
    </Box>
  );
}
