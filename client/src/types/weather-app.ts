export type WeatherData = {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
  dt: number;
  timezone: number;
};
