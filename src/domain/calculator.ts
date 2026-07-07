import type { ExchangeRate } from "./types";

export function calculateKrw(amount: number, rate: ExchangeRate) {
  if (!Number.isFinite(amount) || !Number.isFinite(rate.krwPerUnit)) {
    return 0;
  }

  return (amount / rate.unit) * rate.krwPerUnit;
}

export function formatKrw(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
