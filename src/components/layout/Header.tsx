import type { Category } from "@spree/sdk";
import { User } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { CartButton } from "@/components/layout/CartButton";
import { SearchToggle } from "@/components/layout/SearchToggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { isWholesaleEnabled } from "@/lib/spree";
import { getStoreName } from "@/lib/store";

const LazyMobileMenu = dynamic(
  () =>
    import("@/components/layout/MobileMenu").then((mod) => ({
      default: mod.MobileMenu,
    })),
  {
    loading: () => (
      <div className="inline-flex items-center justify-center h-10 w-10" />
    ),
  },
);

const LazyRegionPreferences = dynamic(
  () =>
    import("@/components/layout/RegionPreferences").then((mod) => ({
      default: mod.RegionPreferences,
    })),
  {
    loading: () => <div className="size-11" aria-hidden="true" />,
  },
);

const storeName = getStoreName();

interface HeaderProps {
  basePath: string;
  locale: Locale;
  mobileNavigation: ReactNode;
}

interface HeaderMobileMenuProps {
  rootCategories: Category[];
  basePath: string;
}

export function HeaderMobileMenu({
  rootCategories,
  basePath,
}: HeaderMobileMenuProps) {
  return (
    <LazyMobileMenu
      rootCategories={rootCategories}
      basePath={basePath}
      wholesaleEnabled={isWholesaleEnabled()}
    />
  );
}

export async function Header({
  basePath,
  locale,
  mobileNavigation,
}: HeaderProps) {
  const t = await getTranslations({ locale, namespace: "header" });
  const wholesaleEnabled = isWholesaleEnabled();

  return (
    <SearchToggle
      basePath={basePath}
      left={mobileNavigation}
      center={
        <Link
          href={basePath || "/"}
          className="flex items-center min-w-0 py-1"
          aria-label={storeName}
        >
          <Logo />
        </Link>
      }
      rightStart={
        <div className="hidden lg:flex lg:items-center lg:gap-2 mr-2">
          <Link
            href={`${basePath}/products`}
            className="px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#1b4332] hover:text-[#2d6a4f] transition-colors whitespace-nowrap"
          >
            Farm Fresh Shop
          </Link>
          <Link
            href={`${basePath}/where-purity-begins`}
            className="px-2.5 py-1.5 text-xs font-medium text-[#52796f] hover:text-[#1b4332] transition-colors whitespace-nowrap"
          >
            Where Purity Begins
          </Link>
          <Link
            href={`${basePath}/from-soil-to-soul`}
            className="px-2.5 py-1.5 text-xs font-medium text-[#52796f] hover:text-[#1b4332] transition-colors whitespace-nowrap"
          >
            From Soil to Soul
          </Link>
          <Link
            href={`${basePath}/track-order`}
            className="px-2.5 py-1.5 text-xs font-bold text-[#d4a373] hover:text-[#b07d4b] transition-colors whitespace-nowrap"
          >
            Track Order
          </Link>
          {wholesaleEnabled && (
            <Link
              href={`${basePath}/wholesale`}
              className="px-2 py-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              {t("wholesale")}
            </Link>
          )}
          <LazyRegionPreferences variant="header" />
        </div>
      }
      rightEnd={
        <>
          {/* Account - desktop only */}
          <div className="hidden md:block">
            <Button variant="ghost" size="icon-lg" asChild>
              <Link href={`${basePath}/account`} aria-label={t("account")}>
                <User className="size-5" />
              </Link>
            </Button>
          </div>

          {/* Cart */}
          <CartButton />
        </>
      }
    />
  );
}
