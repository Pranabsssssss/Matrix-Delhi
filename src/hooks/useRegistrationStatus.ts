"use client";

import { useState, useEffect } from "react";

// Target deadline: Registrations are officially CLOSED
export const REGISTRATION_DEADLINE = new Date("2026-08-14T00:00:00+05:30").getTime();

export function useRegistrationStatus() {
  const [isClosed, setIsClosed] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsClosed(true);
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setIsLoaded(true);
  }, []);

  return { isClosed: true, isLoaded: true, timeLeft };
}
