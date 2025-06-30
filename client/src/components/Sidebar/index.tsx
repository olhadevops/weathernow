"use client";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Stack,
  Chip,
  Card,
  CardContent,
  IconButton,
  Drawer,
} from "@mui/material";
import {
  ArrowBackIos as ArrowBackIcon,
  ArrowForwardIos as ArrowForwardIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { LocationData } from "../../types/location";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
  locations: LocationData[];
  selectedLocationIndex: number;
  onLocationSelect: (index: number) => void;
  onPrevLocation: () => void;
  onNextLocation: () => void;
  handleClose: () => void;
}

const Sidebar = ({
  isOpen,
  locations,
  selectedLocationIndex,
  onLocationSelect,
  onPrevLocation,
  onNextLocation,
  handleClose,
}: SidebarProps) => {
  const selectedLocation = locations[selectedLocationIndex];

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: { width: 320 },
      }}
    >
      <Box sx={{ p: 2, height: "100%", width: 320, overflow: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Current location
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {selectedLocation ? (
          <Card elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocationIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">{selectedLocation.city}</Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {selectedLocation.country}
              </Typography>
              <Chip
                label={`${selectedLocationIndex + 1} из ${locations.length}`}
                size="small"
                variant="outlined"
              />
            </CardContent>
          </Card>
        ) : (
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <LocationIcon
              sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
            />
            <Typography variant="body1" color="text.secondary">
              No available locations
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add location via settings
            </Typography>
          </Paper>
        )}

        {locations.length > 1 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Navigation by location
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton
                onClick={onPrevLocation}
                color="primary"
                sx={{
                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                  "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.2)" },
                }}
              >
                <ArrowBackIcon />
              </IconButton>

              <Box sx={{ textAlign: "center", minWidth: 100 }}>
                <Typography variant="body2" color="text.secondary">
                  {selectedLocationIndex + 1} / {locations.length}
                </Typography>
              </Box>

              <IconButton
                onClick={onNextLocation}
                color="primary"
                sx={{
                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                  "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.2)" },
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
        )}

        {locations.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              All locations
            </Typography>
            <Stack spacing={1}>
              {locations.map((location, index) => (
                <Chip
                  key={location.id}
                  label={`${location.city}, ${location.country}`}
                  variant={
                    index === selectedLocationIndex ? "filled" : "outlined"
                  }
                  color={
                    index === selectedLocationIndex ? "primary" : "default"
                  }
                  onClick={() => onLocationSelect(index)}
                  sx={{
                    justifyContent: "flex-start",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor:
                        index === selectedLocationIndex
                          ? "primary.dark"
                          : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default React.memo(Sidebar);
