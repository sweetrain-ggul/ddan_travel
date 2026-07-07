import type { AppSettings } from "./types";

const STORAGE_KEY = "vietnam-currency-calculator-settings";

export function loadSettings(): AppSettings | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AppSettings;
  } catch {
    return null;
  }
}

export function saveSettings(settings: AppSettings) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
