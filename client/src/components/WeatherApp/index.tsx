import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Avatar,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  LocationOn,
  Water,
  Air,
  Speed,
  Cloud,
  WbSunny,
  Brightness3,
  Schedule,
} from "@mui/icons-material";
import { WeatherData } from "../../types/weather-app";

const formatUnixTime = (timestamp: number, timezone: number) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toUTCString().slice(17, 22);
};

const getWindDirection = (deg: number) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(deg / 22.5) % 16];
};

const WeatherApp: React.FC<{ data: WeatherData }> = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <Card
      sx={{
        maxWidth: 800,
        mx: "auto",
        mt: 3,
        background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        borderRadius: 3,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          color: "white",
          p: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              gap={1}
            >
              <LocationOn />
              {data.name}, {data.sys.country}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>
          <Chip
            label="Live"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Main Weather Display */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar
              src={iconUrl}
              alt={data.weather[0].description}
              sx={{ width: 80, height: 80 }}
              onError={(e: any) => {
                e.target.src = "/placeholder.svg?height=80&width=80";
              }}
            />
            <Box>
              <Typography
                variant="h2"
                component="div"
                fontWeight="bold"
                color="primary"
              >
                {Math.round(data.main.temp)}°C
              </Typography>
              <Typography
                variant="h6"
                sx={{ textTransform: "capitalize", color: "text.secondary" }}
              >
                {data.weather[0].description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Feels like {Math.round(data.main.feels_like)}°C
              </Typography>
            </Box>
          </Box>

          <Box textAlign="right">
            <Typography variant="body2" color="text.secondary" mb={1}>
              High / Low
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              {Math.round(data.main.temp_max)}° /{" "}
              {Math.round(data.main.temp_min)}°
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Weather Details Grid */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} md={3}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "#e3f2fd",
                borderRadius: 2,
              }}
            >
              <Water sx={{ fontSize: 32, color: "#1976d2", mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Humidity
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {data.main.humidity}%
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} md={3}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "#e8f5e8",
                borderRadius: 2,
              }}
            >
              <Air sx={{ fontSize: 32, color: "#388e3c", mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Wind
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {data.wind.speed} m/s
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {getWindDirection(data.wind.deg)}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} md={3}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "#f3e5f5",
                borderRadius: 2,
              }}
            >
              <Speed sx={{ fontSize: 32, color: "#7b1fa2", mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Pressure
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {data.main.pressure}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                hPa
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={6} md={3}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: "#f5f5f5",
                borderRadius: 2,
              }}
            >
              <Cloud sx={{ fontSize: 32, color: "#616161", mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                Clouds
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {data.clouds.all}%
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Sun Times */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                bgcolor: "#fff3e0",
                borderRadius: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <WbSunny sx={{ fontSize: 32, color: "#f57c00" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Sunrise
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatUnixTime(data.sys.sunrise, data.timezone)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                bgcolor: "#fff3e0",
                borderRadius: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Brightness3 sx={{ fontSize: 32, color: "#f57c00" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Sunset
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {formatUnixTime(data.sys.sunset, data.timezone)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Additional Info */}
        {data.wind.gust && (
          <Paper
            sx={{
              p: 2,
              mb: 2,
              bgcolor: "#fffde7",
              borderRadius: 2,
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Air sx={{ fontSize: 24, color: "#f9a825" }} />
              <Typography variant="body2" color="text.secondary">
                Wind Gust:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {data.wind.gust} m/s
              </Typography>
            </Box>
          </Paper>
        )}

        {/* Last Updated */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mt={3}
        >
          <Schedule sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography variant="caption" color="text.secondary">
            Last updated: {formatUnixTime(data.dt, data.timezone)} local time
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherApp;
