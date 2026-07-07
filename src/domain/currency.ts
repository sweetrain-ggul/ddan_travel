import type { CurrencyConfig, CurrencyCode } from "./types";

export const currencies: CurrencyConfig[] = [
  { code: "VND", label: "베트남 동", unit: 100, decimals: 0, enabled: true },
  { code: "JPY", label: "일본 엔", unit: 100, decimals: 0, enabled: true },
  { code: "USD", label: "미국 달러", unit: 1, decimals: 0, enabled: true },
  { code: "CNY", label: "중국 위안", unit: 1, decimals: 0, enabled: true },
];

export function getCurrencyConfig(code: CurrencyCode) {
  return currencies.find((currency) => currency.code === code);
}
