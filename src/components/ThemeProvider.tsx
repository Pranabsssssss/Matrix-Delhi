"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Read theme from cookie or localStorage or DOM root class
    let currentTheme: Theme = "light";

    try {
      const match = document.cookie.match(/(?:^|; )theme=([^;]*)/);
      const cookieTheme = match ? (decodeURIComponent(match[1]) as Theme) : null;
      const localTheme = localStorage.getItem("theme") as Theme | null;
      const hasDarkClass = document.documentElement.classList.contains("dark");

      if (cookieTheme === "dark" || localTheme === "dark" || hasDarkClass) {
        currentTheme = "dark";
      } else {
        currentTheme = "light";
      }
    } catch {
      currentTheme = "light";
    }

    setTheme(currentTheme);
    applyTheme(currentTheme);
  }, []);

  const applyTheme = (targetTheme: Theme) => {
    if (typeof document !== "undefined") {
      if (targetTheme === "dark") {
        document.documentElement.classList.add("dark");
        if (document.body) document.body.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        if (document.body) document.body.classList.remove("dark");
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    applyTheme(nextTheme);

    try {
      // Save selected theme in cookie (expires in 1 year) & localStorage for 100% sitewide persistence
      document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Fallback if cookies/localStorage are restricted
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
