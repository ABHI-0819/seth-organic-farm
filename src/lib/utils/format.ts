export function formatDate(
  dateString: string | null,
  fallback = "-",
  locale = "en-US",
): string {
  if (!dateString) return fallback;
  return new Date(dateString).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(
  dateString: string | null,
  locale = "en-US",
): string {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getPaymentStatusColor(state: string | null): string {
  switch (state) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "balance_due":
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
    case "void":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getFulfillmentStatusColor(state: string | null): string {
  switch (state) {
    case "shipped":
    case "delivered":
      return "bg-green-100 text-green-800";
    case "ready":
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "canceled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

/**
 * Format a numeric or string monetary amount with currency formatting.
 * Defaults to Indian Rupees (INR / ₹) with 'en-IN' locale.
 */
export function formatPrice(
  amount: number | string | null | undefined,
  currency = "INR",
  locale = "en-IN",
): string {
  if (amount == null) return "";
  const numeric =
    typeof amount === "string"
      ? parseFloat(amount.replace(/[^0-9.-]+/g, ""))
      : amount;
  if (Number.isNaN(numeric)) return String(amount);
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numeric);
  } catch {
    return `₹${numeric.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}

/**
 * Format a product or line-item price object to guarantee correct INR (₹) display.
 */
export function formatProductPrice(
  priceObj?: {
    display_amount?: string | null;
    amount?: string | number | null;
    amount_in_cents?: number | null;
    currency?: string | null;
  } | null,
  currency = "INR",
  locale = "en-IN",
): string {
  if (!priceObj) return "";
  if (priceObj.display_amount) {
    return priceObj.display_amount;
  }
  if (priceObj.amount != null) {
    return formatPrice(priceObj.amount, priceObj.currency || currency, locale);
  }
  if (priceObj.amount_in_cents != null) {
    return formatPrice(
      priceObj.amount_in_cents / 100,
      priceObj.currency || currency,
      locale,
    );
  }
  return "";
}
