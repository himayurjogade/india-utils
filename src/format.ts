export interface FormatINROptions {
  /** Prefix with the rupee symbol. Default true. */
  symbol?: boolean;
  /** Decimal places. Default 0. */
  decimals?: number;
}

/**
 * Indian digit grouping (lakh/crore): 1234567 -> "12,34,567".
 * Intl does the grouping; we only pick the options.
 */
export function formatINR(
  amount: number,
  { symbol = true, decimals = 0 }: FormatINROptions = {},
): string {
  if (!Number.isFinite(amount)) {
    throw new RangeError(`formatINR: not a finite number: ${amount}`);
  }
  return new Intl.NumberFormat("en-IN", {
    style: symbol ? "currency" : "decimal",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}
