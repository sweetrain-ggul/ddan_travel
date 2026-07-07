import { useMemo } from "react";
import { calculateKrw, formatKrw } from "../domain/calculator";
import { getCurrencyConfig } from "../domain/currency";
import type { AppSettings, CalculatorState } from "../domain/types";

type CalculatorScreenProps = {
  settings: AppSettings;
  calculatorState: CalculatorState;
  onChangeCalculatorState: (state: CalculatorState) => void;
  onBackToSetup: () => void;
};

export function CalculatorScreen({
  settings,
  calculatorState,
  onChangeCalculatorState,
  onBackToSetup,
}: CalculatorScreenProps) {
  const currentRate = settings.rates[settings.selectedCurrency];
  const currencyConfig = getCurrencyConfig(settings.selectedCurrency);

  const result = useMemo(() => {
    const amount = Number(calculatorState.inputAmount);
    return calculateKrw(amount, currentRate);
  }, [calculatorState.inputAmount, currentRate]);

  const resultText = `${formatKrw(result)}원`;

  return (
    <main className="screen screen-calculator">
      <section className="card">
        <div className="topbar">
          <div>
            <p className="eyebrow">계산</p>
            <h1 className="title">{currencyConfig?.label ?? "통화"} 계산기</h1>
          </div>
        </div>

        <div className="result-box">
          <div className="result-section-label">한국 가격</div>
          <div className="result-value">{resultText}</div>
        </div>

        <label className="field">
          <span className="label label--large">금액 입력</span>
          <input
            className="control input-number input-large"
            inputMode="numeric"
            type="text"
            value={calculatorState.inputAmount}
            placeholder="숫자만 입력"
            onChange={(event) =>
              onChangeCalculatorState({
                ...calculatorState,
                inputAmount: event.target.value.replace(/[^\d]/g, ""),
                resultKrw: result,
              })
            }
          />
        </label>

        <div className="actions">
          <button
            className="primary-button primary-button--reset"
            type="button"
            onClick={() =>
              onChangeCalculatorState({
                inputAmount: "",
                resultKrw: 0,
              })
            }
          >
            초기화
          </button>
          <button className="secondary-button secondary-button--small" type="button" onClick={onBackToSetup}>
            환율 수정
          </button>
        </div>
      </section>
    </main>
  );
}
