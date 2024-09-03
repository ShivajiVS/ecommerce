"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useTheme } from "next-themes";

export const DarkModeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { setTheme } = useTheme();

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-between mx-2">
      <Label htmlFor="dark-mode">Dark Mode</Label>
      <Switch
        checked={isDarkMode}
        onCheckedChange={handleThemeChange}
        id="dark-mode"
        className="dark:bg-white h-6 w-12"
      />
    </div>
  );
};
