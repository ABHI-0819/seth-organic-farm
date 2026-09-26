import type { Category } from "@spree/sdk";
import { CheckCircle2, Heart, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { POLICY_LINKS } from "@/lib/constants/policies";
import { isWholesaleEnabled } from "@/lib/spree";
import { getStoreDescription, getStoreName } from "@/lib/store";
import { CurrentYear } from "./CurrentYear";

const storeName = getStoreName();
const storeDescription = getStoreDescription();

interface FooterProps {
  basePath: string;
  locale: Locale;
  categoryLinks: ReactNode;
}

interface FooterCategoryLinksProps {
  rootCategories: Category[];
  basePath: string;
}

export function FooterCategoryLinks({
  rootCategories,
  basePath,
}: FooterCategoryLinksProps) {
  return rootCategories.map((category) => (
    <li key={category.id}>
      <Link
        href={`${basePath}/c/${category.permalink}`}
        className="text-sm text-[#b7dec5] hover:text-white transition-colors"
      >
        {category.name}
      </Link>
    </li>
  ));
}

export async function Footer({ basePath, locale, categoryLinks }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tp = await getTranslations({ locale, namespace: "policies" });
  const wholesaleEnabled = isWholesaleEnabled();

  return (
    <footer className="bg-[#13281a] text-[#d8e2dc] border-t border-[#1b4332]">
      {/* Top Value Proposition Banner */}
      <div className="border-b border-[#1b4332]/80 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <ShieldCheck className="size-5 text-[#52b788]" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                100% Certified Organic Products
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle2 className="size-5 text-[#52b788]" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                Ethically Sourced from Indian Farms
              </span>
            </div>
            <div className="flex items-center justify-center sm:justify-end gap-3">
              <Heart className="size-5 text-[#d4a373]" />
              <span className="text-xs sm:text-sm font-semibold text-white">
                Chemical &amp; Pesticide Free Living
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          {/* Brand & Mission Column */}
          <div className="col-span-1 md:col-span-2">
            <Link href={basePath || "/"} className="inline-block mb-4">
              <Logo variant="dark" />
            </Link>
            <p className="mt-2 text-sm text-[#a3b899] max-w-sm leading-relaxed">
              {t("description") || storeDescription}
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">
                Join Our Organic Community
              </h4>
              <p className="text-xs text-[#a3b899] mt-1">
                Get seasonal harvest updates, recipes, and exclusive offers.
              </p>
              <form
                className="mt-3 flex max-w-md gap-2"
                onSubmit={undefined}
                action="#"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#52b788]" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-[#1b4332]/60 border border-[#2d6a4f] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-[#74c69d]/60 focus:outline-none focus:border-[#52b788]"
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="bg-[#52b788] hover:bg-[#40916c] text-[#081c14] font-bold rounded-xl text-xs px-4"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Catalog / Shop Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("shop")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href={`${basePath}/products`}
                  className="text-sm text-[#b7dec5] hover:text-white transition-colors"
                >
                  {t("allProducts")}
                </Link>
              </li>
              {categoryLinks}
            </ul>
          </div>

          {/* Account / Support Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("account")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href={`${basePath}/account`}
                  className="text-sm text-[#b7dec5] hover:text-white transition-colors"
                >
                  {t("myAccount")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/account/orders`}
                  className="text-sm text-[#b7dec5] hover:text-white transition-colors"
                >
                  {t("orderHistory")}
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/where-purity-begins`}
                  className="text-sm text-[#b7dec5] hover:text-white transition-colors"
                >
                  Where Purity Begins
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/from-soil-to-soul`}
                  className="text-sm text-[#b7dec5] hover:text-white transition-colors"
                >
                  From Soil to Soul
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/track-order`}
                  className="text-sm font-semibold text-[#d4a373] hover:text-white transition-colors"
                >
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  href={`${basePath}/cart`}
                  className="text-sm text-[#b7dec5] hover:text-white transition-colors"
                >
                  {t("cart")}
                </Link>
              </li>
              {wholesaleEnabled && (
                <li>
                  <Link
                    href={`${basePath}/wholesale`}
                    className="text-sm text-[#b7dec5] hover:text-white transition-colors"
                  >
                    {t("wholesale")}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Policies & Regional Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {t("policies")}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {POLICY_LINKS.map((policy) => (
                <li key={policy.slug}>
                  <Link
                    href={`${basePath}/policies/${policy.slug}`}
                    className="text-sm text-[#b7dec5] hover:text-white transition-colors"
                  >
                    {tp(policy.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-[#1b4332]">
              <p className="text-xs font-semibold text-[#d4a373]">
                Prices displayed in INR (₹)
              </p>
              <p className="text-[11px] text-[#a3b899] mt-0.5">
                All India delivery with GST invoice.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="mt-12 pt-8 border-t border-[#1b4332] text-xs text-[#a3b899] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; <CurrentYear /> {storeName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#74c69d]">
            <span>🌱 Pure Organic</span>
            <span>•</span>
            <span>Certified Indian Farms</span>
            <span>•</span>
            <span>Handcrafted Quality</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
