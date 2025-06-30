"use client";

import type React from "react";

import { useState } from "react";
import { LocationData } from "../types/location";
import { useReduxDispatch } from "./useRedux";
import {
  deleteSettings,
  fetchCreateSettings,
} from "../features/weatherApi/api";

interface UseSettingsPanelProps {
  locations: LocationData[];
  setLocations: (locations: LocationData[]) => void;
  nextId: number;
  setNextId: (id: number) => void;
  selectedLocationIndex: number;
  setSelectedLocationIndex: (index: number) => void;
}

interface UseSettingsPanelReturn {
  country: string;
  city: string;
  onCountryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onAddLocation: () => void;
  onDeleteLocation: (id: number) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  resetForm: () => void;
}

export function useSettingsPanel({
  locations,
  setLocations,
  nextId,
  setNextId,
  selectedLocationIndex,
  setSelectedLocationIndex,
}: UseSettingsPanelProps): UseSettingsPanelReturn {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useReduxDispatch();

  const resetForm = () => {
    setCountry("");
    setCity("");
  };

  const onCountryChange = (value: string) => {
    setCountry(value);
  };

  const onCityChange = (value: string) => {
    setCity(value);
  };

  const onAddLocation = async () => {
    if (country.trim() && city.trim()) {
      const newLocation: LocationData = {
        id: nextId,
        country: country.trim(),
        city: city.trim(),
      };

      dispatch(fetchCreateSettings({ city, country }));

      setLocations([...locations, newLocation]);
      setNextId(nextId + 1);
      resetForm();
    }
  };

  const onDeleteLocation = (id: number) => {
    dispatch(deleteSettings(id));

    console.log("locations", locations);
    const locationIndex = locations.findIndex((loc) => loc.id === id);
    const newLocations = locations.filter((location) => location.id !== id);
    console.log("newLocations", newLocations);
    const locs = newLocations.length ? newLocations : [];
    setLocations(locs);

    if (locs.length === 0) {
      setSelectedLocationIndex(0);
    } else if (selectedLocationIndex >= locs.length) {
      setSelectedLocationIndex(locs.length - 1);
    } else if (
      locationIndex <= selectedLocationIndex &&
      selectedLocationIndex > 0
    ) {
      setSelectedLocationIndex(selectedLocationIndex - 1);
    }
  };

  const onKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onAddLocation();
    }
  };

  return {
    country,
    city,
    onCountryChange,
    onCityChange,
    onAddLocation,
    onDeleteLocation,
    onKeyPress,
    resetForm,
  };
}
