"use client";

import type React from "react";
import { useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "./hooks/useRedux";
import {
  setSelectedCountry,
  setSelectedCity,
  setAvailableCities,
  fetchWeather,
  fetchForecast,
  clearError,
} from "./features/weatherState";
import WeatherApp from "./components/WeatherApp";
import WeatherForecast from "./components/WeatherForecast";
import {
  Container,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Alert,
  CircularProgress,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Autocomplete,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { LocationOn, Cloud, Close, Refresh } from "@mui/icons-material";
import { countries, type Country } from "./data/countries";

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

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #c5cae9 100%)",
        py: 4,
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            mb={2}
          >
            <Cloud sx={{ fontSize: 48, color: "#1976d2" }} />
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              color="primary"
            >
              Weather App
            </Typography>
          </Box>
        </Box>

        {/* Search Form - Elevated and Prominent */}
        <Card
          sx={{
            mb: 3,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(31,38,135,0.15)",
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.8)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <LocationOn sx={{ color: "#1976d2", fontSize: 28 }} />
                <div>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    Location Search
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enter the country and city to get weather information
                  </Typography>
                </div>
              </Box>
              <Tooltip title="Refresh weather data">
                <IconButton
                  color="primary"
                  onClick={handleRefresh}
                  disabled={loading || forecastLoading}
                  sx={{
                    bgcolor: "rgba(25, 118, 210, 0.1)",
                    "&:hover": {
                      bgcolor: "rgba(25, 118, 210, 0.2)",
                    },
                    width: 40,
                    height: 40,
                  }}
                >
                  {loading || forecastLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Refresh
                      sx={{
                        transform:
                          loading || forecastLoading
                            ? "rotate(360deg)"
                            : "none",
                        transition: "transform 1s",
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  value={selectedCountryData || null}
                  onChange={(_, newValue) => handleCountryChange(newValue)}
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  disabled={loading || forecastLoading}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      placeholder="Search country..."
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <img
                          src={`https://flagcdn.com/24x18/${option.code.toLowerCase()}.png`}
                          alt={`${option.name} flag`}
                          style={{ width: 24, height: 18 }}
                        />
                        {option.name}
                      </Box>
                    </Box>
                  )}
                  ListboxProps={{
                    style: {
                      maxHeight: 300,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="city-select-label">City</InputLabel>
                  <Select
                    labelId="city-select-label"
                    value={selectedCity}
                    label="City"
                    onChange={(e) => handleCityChange(e.target.value as string)}
                    disabled={
                      loading || forecastLoading || !selectedCountryData
                    }
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {availableCities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

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

        {/* Weather Results */}
        {Boolean(weatherData?.main?.temp) && !loading && (
          <Box sx={{ animation: "fadeIn 0.5s ease-in", mb: 3 }}>
            <WeatherApp data={weatherData!} />
          </Box>
        )}

        {/* Forecast Results */}
        {Boolean(forecastData?.list?.length) && !forecastLoading && (
          <Box sx={{ animation: "fadeIn 0.5s ease-in" }}>
            <WeatherForecast data={forecastData!} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default App;
