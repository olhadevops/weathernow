import type React from "react";
import { Box, Card, CardContent, Chip, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Air, Cloud, Grain, Water, WbSunny } from "@mui/icons-material";
import { ForecastData } from "../../types/forecast";

interface WeatherForecastProps {
  data: ForecastData;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ data }) => {
  // Group forecast by days (take one forecast per day at noon)
  const seenDates = new Set<string>();
  const dailyForecasts = data.list
    .filter((item) => {
      const date = item.dt_txt.split(" ")[0];
      const hour = new Date(item.dt * 1000).getHours();
      if (!seenDates.has(date) && hour >= 11 && hour <= 13) {
        seenDates.add(date);
        return true;
      }
      return false;
    })
    .slice(0, 5);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getRainChance = (pop: number) => {
    return Math.round(pop * 100);
  };

  return (
    <Card
      sx={{
        maxWidth: 1000,
        mx: "auto",
        mt: 3,
        background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <WbSunny sx={{ color: "#f57c00", fontSize: 28 }} />
          <Typography variant="h5" component="h2" fontWeight="bold">
            5-Day Weather Forecast
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {dailyForecasts.map((forecast, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={forecast.dt}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  background:
                    index === 0
                      ? "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)"
                      : "#fafafa",
                  border:
                    index === 0 ? "2px solid #1976d2" : "1px solid #e0e0e0",
                  borderRadius: 2,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                  },
                }}
              >
                {index === 0 && (
                  <Chip
                    label="Today"
                    size="small"
                    sx={{
                      bgcolor: "#1976d2",
                      color: "white",
                      mb: 1,
                      fontSize: "0.75rem",
                    }}
                  />
                )}

                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="text.secondary"
                  mb={1}
                >
                  {formatDate(forecast.dt)}
                </Typography>

                <Box display="flex" justifyContent="center" mb={1}>
                  <img
                    src={
                      getWeatherIcon(forecast.weather[0].icon) ||
                      "/placeholder.svg"
                    }
                    alt={forecast.weather[0].description}
                    style={{ width: 50, height: 50 }}
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=50&width=50";
                    }}
                  />
                </Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  mb={1}
                >
                  {Math.round(forecast.main.temp)}°C
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  mb={2}
                  display="block"
                >
                  {forecast.weather[0].description}
                </Typography>

                <Box display="flex" flexDirection="column" gap={1}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <Water sx={{ fontSize: 16, color: "#1976d2" }} />
                    <Typography variant="caption">
                      {forecast.main.humidity}%
                    </Typography>
                  </Box>

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <Air sx={{ fontSize: 16, color: "#388e3c" }} />
                    <Typography variant="caption">
                      {forecast.wind.speed} m/s
                    </Typography>
                  </Box>

                  {forecast.pop > 0 && (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                    >
                      <Grain sx={{ fontSize: 16, color: "#1565c0" }} />
                      <Typography variant="caption">
                        {getRainChance(forecast.pop)}%
                      </Typography>
                    </Box>
                  )}

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <Cloud sx={{ fontSize: 16, color: "#616161" }} />
                    <Typography variant="caption">
                      {forecast.clouds.all}%
                    </Typography>
                  </Box>
                </Box>

                <Box mt={1} pt={1} borderTop="1px solid rgba(0,0,0,0.1)">
                  <Typography variant="caption" color="text.secondary">
                    {Math.round(forecast.main.temp_max)}° /{" "}
                    {Math.round(forecast.main.temp_min)}°
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box mt={3} textAlign="center">
          <Typography variant="caption" color="text.secondary">
            Forecast for {data.city.name}, {data.city.country}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
