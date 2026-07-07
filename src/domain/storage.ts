import type { AppSettings } from "./types";

const STORAGE_KEY = "vietnam-currency-calculator-settings";

export function normalizeSettings(settings: AppSettings): AppSettings {
  const vndRate = settings.rates.VND;

  return {
    ...settings,
    rates: {
      ...settings.rates,
      VND: {
        ...vndRate,
        krwPerUnit: Number.isFinite(vndRate.krwPerUnit) && vndRate.krwPerUnit > 0 ? vndRate.krwPerUnit : 6,
      },
    },
  };
}

export function loadSettings(): AppSettings | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return normalizeSettings(JSON.parse(raw) as AppSettings);
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
