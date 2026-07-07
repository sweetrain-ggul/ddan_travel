import { useMemo } from "react";
import type { AppSettings } from "../domain/types";
import { currencies } from "../domain/currency";

type SetupScreenProps = {
  settings: AppSettings;
  onChangeSettings: (settings: AppSettings) => void;
  onNext: () => void;
};

export function SetupScreen({ settings, onChangeSettings, onNext }: SetupScreenProps) {
  const currentRate = settings.rates[settings.selectedCurrency];
  const selectedCurrencyConfig = currencies.find((currency) => currency.code === settings.selectedCurrency);
  const displayRate = currentRate.krwPerUnit > 0 ? String(currentRate.krwPerUnit) : "";

  const unitText = useMemo(() => {
    if (selectedCurrencyConfig?.code === "VND") {
      return "100동당";
    }
    if (selectedCurrencyConfig?.code === "JPY") {
      return "100엔당";
    }
    if (selectedCurrencyConfig?.code === "USD") {
      return "1달러당";
    }
    if (selectedCurrencyConfig?.code === "CNY") {
      return "1위안당";
    }
    return "기준 단위당";
  }, [selectedCurrencyConfig]);

  const handleCurrencyChange = (code: AppSettings["selectedCurrency"]) => {
    const nextRate = settings.rates[code];
    onChangeSettings({
      ...settings,
      selectedCurrency: code,
      rates: {
        ...settings.rates,
        [code]: {
          ...nextRate,
          updatedAt: Date.now(),
        },
      },
    });
  };

  const handleRateChange = (value: string) => {
    const numericValue = Number(value);
    onChangeSettings({
      ...settings,
      rates: {
        ...settings.rates,
        [settings.selectedCurrency]: {
          ...currentRate,
          krwPerUnit: Number.isFinite(numericValue) ? numericValue : 0,
          updatedAt: Date.now(),
        },
      },
    });
  };

  return (
    <main className="screen screen-setup">
      <section className="card">
        <p className="eyebrow">설정</p>
        <h1 className="title">환율을 먼저 입력하세요</h1>
        <p className="subtitle">이 값은 자동 저장되고, 다음 화면에서는 숫자만 입력하면 됩니다.</p>

        <label className="field">
          <span className="label">통화 선택</span>
          <select
            className="control"
            value={settings.selectedCurrency}
            onChange={(event) => handleCurrencyChange(event.target.value as AppSettings["selectedCurrency"])}
          >
            {currencies
              .filter((currency) => currency.enabled)
              .map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.label}
                </option>
              ))}
          </select>
        </label>

        <label className="field">
          <span className="label">{unitText}</span>
          <div className="control-with-unit">
            <input
              className="control input-number"
              inputMode="decimal"
              type="number"
              min="0"
              step="0.1"
              value={displayRate}
              placeholder={selectedCurrencyConfig?.code === "VND" ? "예: 6" : "예: 900"}
              onChange={(event) => handleRateChange(event.target.value.replace(/,/g, ""))}
            />
            <span className="control-unit">원</span>
          </div>
        </label>

        <button className="primary-button" type="button" onClick={onNext}>
          다음으로
        </button>
      </section>
    </main>
  );
}
