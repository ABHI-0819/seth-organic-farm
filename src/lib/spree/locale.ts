import { cookies } from "next/headers";
import { getConfig } from "./config";

const DEFAULT_COUNTRY_COOKIE = "spree_country";
const DEFAULT_LOCALE_COOKIE = "spree_locale";
const DEFAULT_CURRENCY_COOKIE = "spree_currency";

/**
 * Read locale/country/currency from cookies (set by middleware).
 * Falls back to config defaults.
 */
export async function getLocaleOptions(): Promise<{
  locale?: string;
  country?: string;
  currency?: string;
}> {
  const config = getConfig();
  const defaultCurrency =
    config.defaultCurrency || process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || "INR";

  try {
    const cookieStore = await cookies();

    const country = cookieStore.get(
      config.countryCookieName ?? DEFAULT_COUNTRY_COOKIE,
    )?.value;
    const locale = cookieStore.get(
      config.localeCookieName ?? DEFAULT_LOCALE_COOKIE,
    )?.value;
    const currency = cookieStore.get(DEFAULT_CURRENCY_COOKIE)?.value;

    return {
      locale: locale || config.defaultLocale,
      country: country || config.defaultCountry,
      currency: currency || defaultCurrency,
    };
  } catch {
    // During prerendering, cookies() rejects — fall back to config defaults
    return {
      locale: config.defaultLocale,
      country: config.defaultCountry,
      currency: defaultCurrency,
    };
  }
}
