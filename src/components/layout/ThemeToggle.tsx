"use client";

import { Button } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

import { useThemeMode } from "@/context/theme-context";

export function ThemeToggle() {
  const { isDark, toggleMode } = useThemeMode();

  return (
    <Button
      type="text"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      icon={isDark ? <SunOutlined /> : <MoonOutlined />}
      onClick={toggleMode}
    >
    </Button>
  );
}
