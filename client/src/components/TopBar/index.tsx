"use client";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Cloud, Settings as SettingsIcon } from "@mui/icons-material";
import React from "react";

interface TopBarProps {
  onSettingsClick: () => void;
  title?: string;
}

export default function TopBar({
  onSettingsClick,
  title = "Panel of locations",
}: TopBarProps) {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Box display="flex" justifyContent="left" alignItems="center" gap={2}>
            <Cloud sx={{ fontSize: 48, color: "#9bd219" }} />
            <Typography
              variant="h6"
              component="h1"
              fontWeight="bold"
              color="secondary"
            >
              Weather App
            </Typography>
          </Box>
        </Typography>
        <IconButton
          color="inherit"
          aria-label="settings"
          onClick={onSettingsClick}
          sx={{
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
