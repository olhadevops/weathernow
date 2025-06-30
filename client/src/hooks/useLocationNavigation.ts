"use client";

import { useEffect } from "react";
import { LocationData } from "../types/location";
import { fetchForecast, fetchWeather } from "../features/weatherApi";
import { useReduxDispatch } from "./useRedux";

interface UseLocationNavigationProps {
  locations: LocationData[];
  selectedLocationIndex: number;
  setSelectedLocationIndex: (index: number) => void;
}

interface UseLocationNavigationReturn {
  selectedLocation: LocationData | undefined;
  onPrevLocation: () => void;
  onNextLocation: () => void;
  onLocationSelect: (index: number) => void;
}

export function useLocationNavigation({
  locations,
  selectedLocationIndex,
  setSelectedLocationIndex,
}: UseLocationNavigationProps): UseLocationNavigationReturn {
  const dispatch = useReduxDispatch();

  const selectedLocation = locations[selectedLocationIndex];

  const onPrevLocation = () => {
    if (locations.length > 0) {
      setSelectedLocationIndex(
        selectedLocationIndex === 0
          ? locations.length - 1
          : selectedLocationIndex - 1,
      );
    }
  };

  const onNextLocation = () => {
    if (locations.length > 0) {
      setSelectedLocationIndex(
        selectedLocationIndex === locations.length - 1
          ? 0
          : selectedLocationIndex + 1,
      );
    }
  };

  const onLocationSelect = (index: number) => {
    setSelectedLocationIndex(index);
  };

  useEffect(() => {
    if (locations.length === 0) {
      setSelectedLocationIndex(0);
    } else if (selectedLocationIndex >= locations.length) {
      setSelectedLocationIndex(0);
    }
  }, [locations.length, selectedLocationIndex, setSelectedLocationIndex]);

  useEffect(() => {
    const item = locations[selectedLocationIndex || 0];

    if (!item) return;

    dispatch(fetchWeather({ city: item?.city, countryCode: item?.country }));
    dispatch(fetchForecast({ city: item?.city, countryCode: item?.country }));
  }, [selectedLocationIndex]);

  return {
    selectedLocation,
    onPrevLocation,
    onNextLocation,
    onLocationSelect,
  };
}
