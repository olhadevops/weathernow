"use client";

import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Paper,
  Stack,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { LocationData } from "../../types/location";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  locations: LocationData[];
  selectedLocationIndex: number;
  country: string;
  city: string;
  onCountryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onAddLocation: () => void;
  onDeleteLocation: (id: number) => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
}

export default function SettingsPanel({
  isOpen,
  onClose,
  locations,
  selectedLocationIndex,
  country,
  city,
  onCountryChange,
  onCityChange,
  onAddLocation,
  onDeleteLocation,
  onKeyPress,
}: SettingsPanelProps) {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 400,
          maxWidth: "90vw",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Settings locations</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Add new location
          </Typography>

          <Stack spacing={2}>
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              value={country}
              onChange={(e) => onCountryChange(e.target.value)}
              onKeyUp={onKeyPress}
              placeholder="example: Ukraine"
            />

            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
              onKeyUp={onKeyPress}
              placeholder="example: Kyiv"
            />

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddLocation}
              disabled={!country.trim() || !city.trim()}
              fullWidth
            >
              Добавить
            </Button>
          </Stack>
        </Paper>

        <Typography variant="subtitle1" gutterBottom>
          Manage locations ({locations.length})
        </Typography>

        <Paper elevation={1}>
          <List>
            {locations.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="Empty list"
                  secondary="Add first location"
                />
              </ListItem>
            ) : (
              locations.map((location, index) => (
                <React.Fragment key={location.id}>
                  <ListItem
                    sx={{
                      backgroundColor:
                        index === selectedLocationIndex
                          ? "rgba(25, 118, 210, 0.1)"
                          : "transparent",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {location.city}
                          {index === selectedLocationIndex && (
                            <Chip label="Active" size="small" color="primary" />
                          )}
                        </Box>
                      }
                      secondary={location.country}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDeleteLocation(location.id)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < locations.length - 1 && <Divider />}
                </React.Fragment>
              ))
            )}
          </List>
        </Paper>
      </Box>
    </Drawer>
  );
}
