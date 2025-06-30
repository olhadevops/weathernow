import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../constants";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ city, countryCode }: { city: string; countryCode: string }) => {
    return {
      coord: {
        lon: 30.5167,
        lat: 50.4333,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "чисте небо",
          icon: "01n",
        },
      ],
      base: "stations",
      main: {
        temp: 18.18,
        feels_like: 18.04,
        temp_min: 18.18,
        temp_max: 18.18,
        pressure: 1016,
        humidity: 76,
        sea_level: 1016,
        grnd_level: 1000,
      },
      visibility: 10000,
      wind: {
        speed: 0.45,
        deg: 73,
        gust: 0.89,
      },
      clouds: {
        all: 0,
      },
      dt: 1748726080,
      sys: {
        type: 2,
        id: 2003742,
        country: "UA",
        sunrise: 1748742714,
        sunset: 1748800798,
      },
      timezone: 10800,
      id: 703448,
      name: "Kyiv",
      code: 200,
    };
  },
);

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async ({ city, countryCode }: { city: string; countryCode: string }) => {
    return {
      code: "200",
      message: 0,
      cnt: 40,
      list: [
        {
          dt: 1748736000,
          main: {
            temp: 16.78,
            feels_like: 16.68,
            temp_min: 13.98,
            temp_max: 16.78,
            pressure: 1016,
            sea_level: 1016,
            grnd_level: 1000,
            humidity: 83,
            temp_kf: 2.8,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "чисте небо",
              icon: "01n",
            },
          ],
          clouds: {
            all: 0,
          },
          wind: {
            speed: 2.33,
            deg: 293,
            gust: 5.92,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-01 00:00:00",
        },
        {
          dt: 1748746800,
          main: {
            temp: 15.13,
            feels_like: 15.02,
            temp_min: 13.6,
            temp_max: 15.13,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 89,
            temp_kf: 1.53,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "чисте небо",
              icon: "01d",
            },
          ],
          clouds: {
            all: 3,
          },
          wind: {
            speed: 2.11,
            deg: 297,
            gust: 5.32,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-01 03:00:00",
        },
        {
          dt: 1748757600,
          main: {
            temp: 18.38,
            feels_like: 18.05,
            temp_min: 18.38,
            temp_max: 18.38,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 68,
            temp_kf: 0,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "чисте небо",
              icon: "01d",
            },
          ],
          clouds: {
            all: 2,
          },
          wind: {
            speed: 3.12,
            deg: 317,
            gust: 4.68,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-01 06:00:00",
        },
        {
          dt: 1748768400,
          main: {
            temp: 24.29,
            feels_like: 24.08,
            temp_min: 24.29,
            temp_max: 24.29,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1002,
            humidity: 50,
            temp_kf: 0,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "чисте небо",
              icon: "01d",
            },
          ],
          clouds: {
            all: 0,
          },
          wind: {
            speed: 3.76,
            deg: 324,
            gust: 5.41,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-01 09:00:00",
        },
        {
          dt: 1748779200,
          main: {
            temp: 21.67,
            feels_like: 21.2,
            temp_min: 21.67,
            temp_max: 21.67,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 50,
            temp_kf: 0,
          },
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "уривчасті хмари",
              icon: "03d",
            },
          ],
          clouds: {
            all: 36,
          },
          wind: {
            speed: 2.71,
            deg: 344,
            gust: 4.73,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-01 12:00:00",
        },
        {
          dt: 1748790000,
          main: {
            temp: 23.1,
            feels_like: 22.54,
            temp_min: 23.1,
            temp_max: 23.1,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 41,
            temp_kf: 0,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "рвані хмари",
              icon: "04d",
            },
          ],
          clouds: {
            all: 55,
          },
          wind: {
            speed: 2.85,
            deg: 325,
            gust: 3.66,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-01 15:00:00",
        },
        {
          dt: 1748800800,
          main: {
            temp: 17.88,
            feels_like: 17.55,
            temp_min: 17.88,
            temp_max: 17.88,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 70,
            temp_kf: 0,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "рвані хмари",
              icon: "04n",
            },
          ],
          clouds: {
            all: 54,
          },
          wind: {
            speed: 1.42,
            deg: 94,
            gust: 1.8,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-01 18:00:00",
        },
        {
          dt: 1748811600,
          main: {
            temp: 15.85,
            feels_like: 15.42,
            temp_min: 15.85,
            temp_max: 15.85,
            pressure: 1018,
            sea_level: 1018,
            grnd_level: 1002,
            humidity: 74,
            temp_kf: 0,
          },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "кілька хмар",
              icon: "02n",
            },
          ],
          clouds: {
            all: 19,
          },
          wind: {
            speed: 0.72,
            deg: 95,
            gust: 0.57,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-01 21:00:00",
        },
        {
          dt: 1748822400,
          main: {
            temp: 14.61,
            feels_like: 14.16,
            temp_min: 14.61,
            temp_max: 14.61,
            pressure: 1018,
            sea_level: 1018,
            grnd_level: 1002,
            humidity: 78,
            temp_kf: 0,
          },
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "уривчасті хмари",
              icon: "03n",
            },
          ],
          clouds: {
            all: 48,
          },
          wind: {
            speed: 0.85,
            deg: 117,
            gust: 0.77,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-02 00:00:00",
        },
        {
          dt: 1748833200,
          main: {
            temp: 14.48,
            feels_like: 14.07,
            temp_min: 14.48,
            temp_max: 14.48,
            pressure: 1018,
            sea_level: 1018,
            grnd_level: 1002,
            humidity: 80,
            temp_kf: 0,
          },
          weather: [
            {
              id: 804,
              main: "Clouds",
              description: "хмарно",
              icon: "04d",
            },
          ],
          clouds: {
            all: 96,
          },
          wind: {
            speed: 1.55,
            deg: 190,
            gust: 2.93,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-02 03:00:00",
        },
        {
          dt: 1748844000,
          main: {
            temp: 19.48,
            feels_like: 19.05,
            temp_min: 19.48,
            temp_max: 19.48,
            pressure: 1018,
            sea_level: 1018,
            grnd_level: 1002,
            humidity: 60,
            temp_kf: 0,
          },
          weather: [
            {
              id: 804,
              main: "Clouds",
              description: "хмарно",
              icon: "04d",
            },
          ],
          clouds: {
            all: 98,
          },
          wind: {
            speed: 3.18,
            deg: 205,
            gust: 5.4,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-02 06:00:00",
        },
        {
          dt: 1748854800,
          main: {
            temp: 23.61,
            feels_like: 23.36,
            temp_min: 23.61,
            temp_max: 23.61,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 51,
            temp_kf: 0,
          },
          weather: [
            {
              id: 804,
              main: "Clouds",
              description: "хмарно",
              icon: "04d",
            },
          ],
          clouds: {
            all: 87,
          },
          wind: {
            speed: 4.71,
            deg: 200,
            gust: 6.02,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-02 09:00:00",
        },
        {
          dt: 1748865600,
          main: {
            temp: 23.43,
            feels_like: 23.5,
            temp_min: 23.43,
            temp_max: 23.43,
            pressure: 1016,
            sea_level: 1016,
            grnd_level: 1000,
            humidity: 64,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 94,
          },
          wind: {
            speed: 5.16,
            deg: 226,
            gust: 7.33,
          },
          visibility: 10000,
          pop: 1,
          rain: {
            "3h": 0.92,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-02 12:00:00",
        },
        {
          dt: 1748876400,
          main: {
            temp: 22.61,
            feels_like: 22.94,
            temp_min: 22.61,
            temp_max: 22.61,
            pressure: 1015,
            sea_level: 1015,
            grnd_level: 999,
            humidity: 77,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 99,
          },
          wind: {
            speed: 3.77,
            deg: 250,
            gust: 7.21,
          },
          visibility: 10000,
          pop: 1,
          rain: {
            "3h": 1,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-02 15:00:00",
        },
        {
          dt: 1748887200,
          main: {
            temp: 19.63,
            feels_like: 20,
            temp_min: 19.63,
            temp_max: 19.63,
            pressure: 1015,
            sea_level: 1015,
            grnd_level: 999,
            humidity: 90,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 83,
          },
          wind: {
            speed: 2.47,
            deg: 240,
            gust: 6.36,
          },
          visibility: 10000,
          pop: 1,
          rain: {
            "3h": 0.12,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-02 18:00:00",
        },
        {
          dt: 1748898000,
          main: {
            temp: 18.21,
            feels_like: 18.51,
            temp_min: 18.21,
            temp_max: 18.21,
            pressure: 1015,
            sea_level: 1015,
            grnd_level: 1000,
            humidity: 93,
            temp_kf: 0,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "рвані хмари",
              icon: "04n",
            },
          ],
          clouds: {
            all: 69,
          },
          wind: {
            speed: 2.49,
            deg: 256,
            gust: 6.68,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-02 21:00:00",
        },
        {
          dt: 1748908800,
          main: {
            temp: 17.49,
            feels_like: 17.7,
            temp_min: 17.49,
            temp_max: 17.49,
            pressure: 1015,
            sea_level: 1015,
            grnd_level: 999,
            humidity: 92,
            temp_kf: 0,
          },
          weather: [
            {
              id: 804,
              main: "Clouds",
              description: "хмарно",
              icon: "04n",
            },
          ],
          clouds: {
            all: 85,
          },
          wind: {
            speed: 1.58,
            deg: 266,
            gust: 1.58,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-03 00:00:00",
        },
        {
          dt: 1748919600,
          main: {
            temp: 17.31,
            feels_like: 17.52,
            temp_min: 17.31,
            temp_max: 17.31,
            pressure: 1014,
            sea_level: 1014,
            grnd_level: 999,
            humidity: 93,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 100,
          },
          wind: {
            speed: 1.83,
            deg: 242,
            gust: 2.92,
          },
          visibility: 10000,
          pop: 0.43,
          rain: {
            "3h": 0.26,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-03 03:00:00",
        },
        {
          dt: 1748930400,
          main: {
            temp: 20.92,
            feels_like: 21.21,
            temp_min: 20.92,
            temp_max: 20.92,
            pressure: 1014,
            sea_level: 1014,
            grnd_level: 998,
            humidity: 82,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 95,
          },
          wind: {
            speed: 2.29,
            deg: 198,
            gust: 3.37,
          },
          visibility: 10000,
          pop: 0.83,
          rain: {
            "3h": 0.39,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-03 06:00:00",
        },
        {
          dt: 1748941200,
          main: {
            temp: 25.39,
            feels_like: 25.55,
            temp_min: 25.39,
            temp_max: 25.39,
            pressure: 1012,
            sea_level: 1012,
            grnd_level: 996,
            humidity: 60,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 49,
          },
          wind: {
            speed: 5.53,
            deg: 216,
            gust: 9.67,
          },
          visibility: 10000,
          pop: 1,
          rain: {
            "3h": 1.12,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-03 09:00:00",
        },
        {
          dt: 1748952000,
          main: {
            temp: 23.96,
            feels_like: 24.32,
            temp_min: 23.96,
            temp_max: 23.96,
            pressure: 1011,
            sea_level: 1011,
            grnd_level: 995,
            humidity: 73,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 74,
          },
          wind: {
            speed: 6.02,
            deg: 259,
            gust: 10.51,
          },
          visibility: 10000,
          pop: 1,
          rain: {
            "3h": 0.86,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-03 12:00:00",
        },
        {
          dt: 1748962800,
          main: {
            temp: 21.43,
            feels_like: 21.61,
            temp_min: 21.43,
            temp_max: 21.43,
            pressure: 1012,
            sea_level: 1012,
            grnd_level: 996,
            humidity: 76,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 79,
          },
          wind: {
            speed: 6.03,
            deg: 309,
            gust: 9.58,
          },
          visibility: 10000,
          pop: 1,
          rain: {
            "3h": 1.39,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-03 15:00:00",
        },
        {
          dt: 1748973600,
          main: {
            temp: 17.39,
            feels_like: 17.27,
            temp_min: 17.39,
            temp_max: 17.39,
            pressure: 1014,
            sea_level: 1014,
            grnd_level: 998,
            humidity: 80,
            temp_kf: 0,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "рвані хмари",
              icon: "04d",
            },
          ],
          clouds: {
            all: 79,
          },
          wind: {
            speed: 2.3,
            deg: 0,
            gust: 4.4,
          },
          visibility: 10000,
          pop: 0.8,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-03 18:00:00",
        },
        {
          dt: 1748984400,
          main: {
            temp: 15.1,
            feels_like: 15.02,
            temp_min: 15.1,
            temp_max: 15.1,
            pressure: 1016,
            sea_level: 1016,
            grnd_level: 1000,
            humidity: 90,
            temp_kf: 0,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "рвані хмари",
              icon: "04n",
            },
          ],
          clouds: {
            all: 62,
          },
          wind: {
            speed: 2.37,
            deg: 357,
            gust: 4.93,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-03 21:00:00",
        },
        {
          dt: 1748995200,
          main: {
            temp: 13.61,
            feels_like: 13.43,
            temp_min: 13.61,
            temp_max: 13.61,
            pressure: 1016,
            sea_level: 1016,
            grnd_level: 1000,
            humidity: 92,
            temp_kf: 0,
          },
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "уривчасті хмари",
              icon: "03n",
            },
          ],
          clouds: {
            all: 49,
          },
          wind: {
            speed: 1.63,
            deg: 358,
            gust: 3.04,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-04 00:00:00",
        },
        {
          dt: 1749006000,
          main: {
            temp: 13.53,
            feels_like: 13.31,
            temp_min: 13.53,
            temp_max: 13.53,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 91,
            temp_kf: 0,
          },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "кілька хмар",
              icon: "02d",
            },
          ],
          clouds: {
            all: 18,
          },
          wind: {
            speed: 0.78,
            deg: 360,
            gust: 1.34,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-04 03:00:00",
        },
        {
          dt: 1749016800,
          main: {
            temp: 18.56,
            feels_like: 18.22,
            temp_min: 18.56,
            temp_max: 18.56,
            pressure: 1018,
            sea_level: 1018,
            grnd_level: 1002,
            humidity: 67,
            temp_kf: 0,
          },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "кілька хмар",
              icon: "02d",
            },
          ],
          clouds: {
            all: 20,
          },
          wind: {
            speed: 0.84,
            deg: 333,
            gust: 1.16,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-04 06:00:00",
        },
        {
          dt: 1749027600,
          main: {
            temp: 23.43,
            feels_like: 23.08,
            temp_min: 23.43,
            temp_max: 23.43,
            pressure: 1018,
            sea_level: 1018,
            grnd_level: 1002,
            humidity: 48,
            temp_kf: 0,
          },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "кілька хмар",
              icon: "02d",
            },
          ],
          clouds: {
            all: 20,
          },
          wind: {
            speed: 0.7,
            deg: 340,
            gust: 0.98,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-04 09:00:00",
        },
        {
          dt: 1749038400,
          main: {
            temp: 25.46,
            feels_like: 25,
            temp_min: 25.46,
            temp_max: 25.46,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 36,
            temp_kf: 0,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "рвані хмари",
              icon: "04d",
            },
          ],
          clouds: {
            all: 61,
          },
          wind: {
            speed: 0.81,
            deg: 264,
            gust: 1.59,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-04 12:00:00",
        },
        {
          dt: 1749049200,
          main: {
            temp: 24.79,
            feels_like: 24.4,
            temp_min: 24.79,
            temp_max: 24.79,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 41,
            temp_kf: 0,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "чисте небо",
              icon: "01d",
            },
          ],
          clouds: {
            all: 6,
          },
          wind: {
            speed: 1.22,
            deg: 233,
            gust: 1.92,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-04 15:00:00",
        },
        {
          dt: 1749060000,
          main: {
            temp: 19.9,
            feels_like: 19.56,
            temp_min: 19.9,
            temp_max: 19.9,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 62,
            temp_kf: 0,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "чисте небо",
              icon: "01d",
            },
          ],
          clouds: {
            all: 7,
          },
          wind: {
            speed: 0.87,
            deg: 267,
            gust: 0.8,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-04 18:00:00",
        },
        {
          dt: 1749070800,
          main: {
            temp: 18.07,
            feels_like: 17.66,
            temp_min: 18.07,
            temp_max: 18.07,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 66,
            temp_kf: 0,
          },
          weather: [
            {
              id: 802,
              main: "Clouds",
              description: "уривчасті хмари",
              icon: "03n",
            },
          ],
          clouds: {
            all: 45,
          },
          wind: {
            speed: 2.11,
            deg: 167,
            gust: 3.22,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-04 21:00:00",
        },
        {
          dt: 1749081600,
          main: {
            temp: 16.77,
            feels_like: 16.38,
            temp_min: 16.77,
            temp_max: 16.77,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 72,
            temp_kf: 0,
          },
          weather: [
            {
              id: 803,
              main: "Clouds",
              description: "рвані хмари",
              icon: "04n",
            },
          ],
          clouds: {
            all: 64,
          },
          wind: {
            speed: 2.28,
            deg: 165,
            gust: 5.87,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-05 00:00:00",
        },
        {
          dt: 1749092400,
          main: {
            temp: 16.9,
            feels_like: 16.73,
            temp_min: 16.9,
            temp_max: 16.9,
            pressure: 1017,
            sea_level: 1017,
            grnd_level: 1001,
            humidity: 80,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 69,
          },
          wind: {
            speed: 2.72,
            deg: 184,
            gust: 8.56,
          },
          visibility: 10000,
          pop: 0.27,
          rain: {
            "3h": 0.14,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-05 03:00:00",
        },
        {
          dt: 1749103200,
          main: {
            temp: 21.01,
            feels_like: 20.94,
            temp_min: 21.01,
            temp_max: 21.01,
            pressure: 1016,
            sea_level: 1016,
            grnd_level: 1000,
            humidity: 68,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 72,
          },
          wind: {
            speed: 4.31,
            deg: 187,
            gust: 7.99,
          },
          visibility: 10000,
          pop: 0.36,
          rain: {
            "3h": 0.15,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-05 06:00:00",
        },
        {
          dt: 1749114000,
          main: {
            temp: 26.47,
            feels_like: 26.47,
            temp_min: 26.47,
            temp_max: 26.47,
            pressure: 1015,
            sea_level: 1015,
            grnd_level: 999,
            humidity: 54,
            temp_kf: 0,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "чисте небо",
              icon: "01d",
            },
          ],
          clouds: {
            all: 8,
          },
          wind: {
            speed: 5.34,
            deg: 198,
            gust: 6.67,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-05 09:00:00",
        },
        {
          dt: 1749124800,
          main: {
            temp: 29.14,
            feels_like: 29.48,
            temp_min: 29.14,
            temp_max: 29.14,
            pressure: 1014,
            sea_level: 1014,
            grnd_level: 998,
            humidity: 47,
            temp_kf: 0,
          },
          weather: [
            {
              id: 800,
              main: "Clear",
              description: "чисте небо",
              icon: "01d",
            },
          ],
          clouds: {
            all: 9,
          },
          wind: {
            speed: 5.62,
            deg: 204,
            gust: 6.76,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-05 12:00:00",
        },
        {
          dt: 1749135600,
          main: {
            temp: 28.75,
            feels_like: 29.69,
            temp_min: 28.75,
            temp_max: 28.75,
            pressure: 1013,
            sea_level: 1013,
            grnd_level: 997,
            humidity: 53,
            temp_kf: 0,
          },
          weather: [
            {
              id: 801,
              main: "Clouds",
              description: "кілька хмар",
              icon: "02d",
            },
          ],
          clouds: {
            all: 23,
          },
          wind: {
            speed: 4.84,
            deg: 209,
            gust: 7.18,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-05 15:00:00",
        },
        {
          dt: 1749146400,
          main: {
            temp: 24.49,
            feels_like: 24.95,
            temp_min: 24.49,
            temp_max: 24.49,
            pressure: 1012,
            sea_level: 1012,
            grnd_level: 997,
            humidity: 75,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10d",
            },
          ],
          clouds: {
            all: 51,
          },
          wind: {
            speed: 3.59,
            deg: 209,
            gust: 10.07,
          },
          visibility: 10000,
          pop: 0.39,
          rain: {
            "3h": 0.15,
          },
          sys: {
            pod: "d",
          },
          dt_txt: "2025-06-05 18:00:00",
        },
        {
          dt: 1749157200,
          main: {
            temp: 21.31,
            feels_like: 21.85,
            temp_min: 21.31,
            temp_max: 21.31,
            pressure: 1013,
            sea_level: 1013,
            grnd_level: 997,
            humidity: 90,
            temp_kf: 0,
          },
          weather: [
            {
              id: 500,
              main: "Rain",
              description: "легкий дощ",
              icon: "10n",
            },
          ],
          clouds: {
            all: 64,
          },
          wind: {
            speed: 3.08,
            deg: 231,
            gust: 10.24,
          },
          visibility: 10000,
          pop: 1,
          rain: {
            "3h": 1.02,
          },
          sys: {
            pod: "n",
          },
          dt_txt: "2025-06-05 21:00:00",
        },
      ],
      city: {
        id: 703448,
        name: "Kyiv",
        coord: {
          lat: 50.4333,
          lon: 30.5167,
        },
        country: "UA",
        population: 2514227,
        timezone: 10800,
        sunrise: 1748742714,
        sunset: 1748800798,
      },
    };
  },
);
