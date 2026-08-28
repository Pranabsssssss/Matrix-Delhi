"use client";

import { useTheme } from "@/components/ThemeProvider";

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg";
}

export default function AnimatedLogo({ size = "md" }: AnimatedLogoProps) {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
      {/* Light Theme Logo (/logo.svg) */}
      <img
        src="/logo.svg"
        alt="MATRIX DELHI Light Logo"
        className={`w-full h-full object-contain absolute inset-0 transition-all duration-500 ease-in-out ${
          theme === "dark"
            ? "opacity-0 scale-90 -rotate-12 pointer-events-none"
            : "opacity-100 scale-100 rotate-0"
        }`}
      />
      {/* Dark Theme Logo (/favicon.svg with crisp white lines) */}
      <img
        src="/favicon.svg"
        alt="MATRIX DELHI Dark Logo"
        className={`w-full h-full object-contain absolute inset-0 transition-all duration-500 ease-in-out ${
          theme === "dark"
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-90 rotate-12 pointer-events-none"
        }`}
      />
    </div>
  );
}
