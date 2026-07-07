import { useEffect, useState } from "react";
import { CalculatorScreen } from "../screens/CalculatorScreen";
import { SetupScreen } from "../screens/SetupScreen";
import { loadSettings, saveSettings } from "../domain/storage";
import type { AppSettings, CalculatorState } from "../domain/types";

type ViewMode = "setup" | "calculator";

function createDefaultSettings(): AppSettings {
  return {
    selectedCurrency: "VND",
    rates: {
      VND: { code: "VND", unit: 100, krwPerUnit: 0, updatedAt: Date.now() },
      JPY: { code: "JPY", unit: 100, krwPerUnit: 0, updatedAt: Date.now() },
      USD: { code: "USD", unit: 1, krwPerUnit: 0, updatedAt: Date.now() },
      CNY: { code: "CNY", unit: 1, krwPerUnit: 0, updatedAt: Date.now() },
    },
  };
}

export function App() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings() ?? createDefaultSettings());
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    inputAmount: "",
    resultKrw: 0,
  });
  const [viewMode, setViewMode] = useState<ViewMode>(() => (loadSettings() ? "calculator" : "setup"));

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  if (viewMode === "setup") {
    return (
      <SetupScreen
        settings={settings}
        onChangeSettings={setSettings}
        onNext={() => setViewMode("calculator")}
      />
    );
  }

  return (
    <CalculatorScreen
      settings={settings}
      calculatorState={calculatorState}
      onChangeCalculatorState={setCalculatorState}
      onBackToSetup={() => setViewMode("setup")}
    />
  );
}
