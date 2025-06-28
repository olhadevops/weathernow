"use client";

import { useState } from "react";

interface UsePanelStateReturn {
  drawerOpen: boolean;
  leftPanelOpen: boolean;
  handleDrawerToggle: () => void;
  handleLeftPanelToggle: () => void;
}

export function usePanelState(): UsePanelStateReturn {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLeftPanelToggle = () => {
    setLeftPanelOpen(!leftPanelOpen);
  };

  return {
    drawerOpen,
    leftPanelOpen,
    handleDrawerToggle,
    handleLeftPanelToggle,
  };
}
