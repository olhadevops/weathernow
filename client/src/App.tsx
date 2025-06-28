"use client";

import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
  ArrowBackIos as ArrowBackIcon,
  ArrowForwardIos as ArrowForwardIcon,
} from "@mui/icons-material";
import { Close } from "@mui/icons-material";
import {
  Typography,
  IconButton,
  Box,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useReduxDispatch, useReduxSelector } from "./hooks/useRedux";
import {
  setSelectedCountry,
  setSelectedCity,
  setAvailableCities,
  clearError,
} from "./features/weatherState";
import { countries, type Country } from "./data/countries";
import MainContent from "./components/MainContent";
import SettingsPanel from "./components/SettingsPanelProps";
import { usePanelState } from "./hooks/usePanelState";
import { LocationData } from "./types/location";
import { useSettingsPanel } from "./hooks/useSettingsPanel";
import { useLocationNavigation } from "./hooks/useLocationNavigation";
import { fetchForecast, fetchWeather } from "./features/weatherApi";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  const dispatch = useReduxDispatch();
  const {
    selectedCountry,
    selectedCity,
    availableCities,
    weatherData,
    forecastData,
    loading,
    forecastLoading,
    error,
  } = useReduxSelector((state) => state.weather);

  const [locations, setLocations] = useState<LocationData[]>([
    { id: 1, country: "Ukraine", city: "Kyiv" },
    { id: 2, country: "USA", city: "New York" },
    { id: 3, country: "France", city: "Paris" },
  ]);

  const [selectedLocationIndex, setSelectedLocationIndex] = useState(0);
  const [nextId, setNextId] = useState(3);
  const ignoreScroll = useRef<boolean>(false);

  const {
    drawerOpen,
    leftPanelOpen,
    handleDrawerToggle,
    handleLeftPanelToggle,
  } = usePanelState();

  const { selectedLocation, onPrevLocation, onNextLocation, onLocationSelect } =
    useLocationNavigation({
      locations,
      selectedLocationIndex,
      setSelectedLocationIndex,
    });

  const settingsPanel = useSettingsPanel({
    locations,
    setLocations,
    nextId,
    setNextId,
    selectedLocationIndex,
    setSelectedLocationIndex,
  });

  // Update available cities when country changes
  useEffect(() => {
    const country = countries.find((c) => c.code === selectedCountry);
    if (country) {
      dispatch(setAvailableCities(country.cities));
      // Set first city as default if current city is not in the new country
      if (!country.cities.includes(selectedCity)) {
        dispatch(setSelectedCity(country.cities[0]));
      }
    }
  }, [selectedCountry, dispatch]);

  // Auto-fetch weather and forecast when country or city changes
  useEffect(() => {
    if (selectedCountry && selectedCity) {
      dispatch(
        fetchWeather({ city: selectedCity, countryCode: selectedCountry }),
      );
      dispatch(
        fetchForecast({ city: selectedCity, countryCode: selectedCountry }),
      );
    }
  }, [selectedCountry, selectedCity, dispatch]);

  const handleCountryChange = (country: Country | null) => {
    if (country) {
      dispatch(setSelectedCountry(country.code));
    }
  };

  const handleCityChange = (city: string) => {
    dispatch(setSelectedCity(city));
  };

  const handleRefresh = () => {
    if (selectedCountry && selectedCity) {
      dispatch(
        fetchWeather({ city: selectedCity, countryCode: selectedCountry }),
      );
      dispatch(
        fetchForecast({ city: selectedCity, countryCode: selectedCountry }),
      );
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  const selectedCountryData = countries.find((c) => c.code === selectedCountry);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "auto",
      }}
      ref={scrollContainerRef}
    >
      <TopBar onSettingsClick={handleDrawerToggle} />

      {/* Loading State */}
      {(loading || forecastLoading) && (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            mb: 3,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <CircularProgress size={40} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary" mb={1}>
            {loading && forecastLoading
              ? `Loading weather data for ${selectedCity}...`
              : loading
                ? `Fetching current weather for ${selectedCity}...`
                : `Loading forecast for ${selectedCity}...`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {process.env.REACT_APP_API_BASE_URL
              ? "Connecting to API..."
              : "Using demo data..."}
          </Typography>
        </Paper>
      )}

      {/* Error State */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          action={
            <IconButton size="small" onClick={handleClearError}>
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", flex: 1, position: "relative" }}>
        <Sidebar
          isOpen={leftPanelOpen}
          locations={locations}
          selectedLocationIndex={selectedLocationIndex}
          onLocationSelect={onLocationSelect}
          onPrevLocation={onPrevLocation}
          onNextLocation={onNextLocation}
          handleClose={handleLeftPanelToggle}
        />
        <IconButton
          onClick={handleLeftPanelToggle}
          sx={{
            position: "fixed",
            left: leftPanelOpen ? 300 : 10,
            top: 80,
            zIndex: 1000,
            backgroundColor: "background.paper",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            boxShadow: 2,
            width: 40,
            height: 40,
            transition: "left 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.04)",
              boxShadow: 3,
            },
          }}
        >
          {leftPanelOpen ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        </IconButton>
        <Box
          sx={{
            flex: 1,
            position: "relative",
            overflow: "auto",
            height: "100%",
          }}
        >
          <MainContent
            isLoading={loading}
            isForecastLoading={forecastLoading}
            weatherData={weatherData}
            forecastData={forecastData}
          />
        </Box>
      </Box>

      <SettingsPanel
        isOpen={drawerOpen}
        onClose={handleDrawerToggle}
        locations={locations}
        selectedLocationIndex={selectedLocationIndex}
        {...settingsPanel}
      />
    </Box>
  );
};

export default App;
