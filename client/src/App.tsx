import React from "react";
import { useReduxDispatch, useReduxSelector } from "./hooks/useRedux";
import { setCity, setCountry, fetchWeather } from "./features/weatherState";

const App: React.FC = () => {
    const dispatch = useReduxDispatch();
    const { city, country, temperature, loading, error } = useReduxSelector(
        (state: any) => state.weather
    );

    return (
        <div>
            <h1>Weather App</h1>
            <label>
                Country:
                <input
                    type="text"
                    value={country}
                    onChange={(e) => dispatch(setCountry(e.target.value))}
                />
            </label>
            <label>
                City:
                <input
                    type="text"
                    value={city}
                    onChange={(e) => dispatch(setCity(e.target.value))}
                />
            </label>
            <button onClick={() => dispatch(fetchWeather({ city, country }))}>
                Get Weather
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {temperature !== null && <p>Temperature: {temperature}°C</p>}
        </div>
    );
};

export default App;