export type CurrencyCode = "VND" | "JPY" | "USD" | "CNY";

export type CurrencyConfig = {
  code: CurrencyCode;
  label: string;
  unit: number;
  decimals: number;
  enabled: boolean;
};

export type ExchangeRate = {
  code: CurrencyCode;
  unit: number;
  krwPerUnit: number;
  updatedAt: number;
};

export type AppSettings = {
  selectedCurrency: CurrencyCode;
  rates: Record<CurrencyCode, ExchangeRate>;
};

export type CalculatorState = {
  inputAmount: string;
  resultKrw: number;
};
