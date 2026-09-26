"use client";

import type { Product } from "@spree/sdk";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { HiddenPricePrompt } from "@/components/products/HiddenPricePrompt";
import { ProductImage } from "@/components/ui/product-image";
import { trackSelectItem } from "@/lib/analytics/gtm";
import { formatProductPrice } from "@/lib/utils/format";

interface ProductCardProps {
  product: Product;
  basePath?: string;
  categoryId?: string;
  index?: number;
  listId?: string;
  listName?: string;
  fetchPriority?: "high" | "low" | "auto";
  /** Optional currency used for analytics and formatting; defaults to INR. */
  currency?: string;
}

export const ProductCard = memo(function ProductCard({
  product,
  basePath = "",
  categoryId,
  index,
  listId,
  listName,
  fetchPriority,
  currency = "INR",
}: ProductCardProps) {
  const t = useTranslations("products");
  let imageUrl = product.thumbnail_url || null;
  const slugLower = product.slug?.toLowerCase() || "";
  const nameLower = product.name?.toLowerCase() || "";
  if (!imageUrl) {
    if (slugLower.includes("ghee") || nameLower.includes("ghee")) {
      imageUrl = "/images/seth-a2-ghee.jpg";
    } else if (
      slugLower.includes("mustard") ||
      slugLower.includes("oil") ||
      nameLower.includes("oil")
    ) {
      imageUrl = "/images/seth-mustard-oil.jpg";
    } else if (slugLower.includes("mango") || nameLower.includes("mango")) {
      imageUrl = "/images/seth-alphonso-mangoes.jpg";
    }
  }

  // Current display price
  const displayPrice = product.price
    ? (product.price.display_amount ??
      formatProductPrice(product.price, currency, "en-IN"))
    : null;

  const currentAmountCents = product.price?.amount_in_cents;
  const originalAmountCents = product.original_price?.amount_in_cents;
  const compareAtAmountCents = product.price?.compare_at_amount_in_cents;
  const onSale =
    (currentAmountCents != null &&
      originalAmountCents != null &&
      currentAmountCents < originalAmountCents) ||
    (compareAtAmountCents != null &&
      currentAmountCents != null &&
      currentAmountCents < compareAtAmountCents);

  const strikethroughPrice = onSale
    ? ((product.original_price?.display_amount &&
      product.original_price.display_amount !== displayPrice
        ? product.original_price.display_amount
        : product.price?.display_compare_at_amount) ??
      formatProductPrice(
        product.original_price || {
          amount: product.price?.compare_at_amount,
          currency: product.price?.currency,
        },
        currency,
        "en-IN",
      ))
    : null;

  const handleClick = () => {
    if (index != null && listId && listName && currency) {
      trackSelectItem(product, listId, listName, index, currency);
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-[#e3dcd2] bg-white p-3 shadow-xs hover:border-[#52b788]/60 hover:shadow-md transition-all duration-300">
      {/* Image container */}
      <div className="relative aspect-square bg-[#f4efea] rounded-xl overflow-hidden">
        <ProductImage
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 300px"
          iconClassName="w-16 h-16 text-[#8ac9a3]"
          fetchPriority={fetchPriority}
        />
        {/* Organic & Sale Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
          <span className="inline-flex items-center gap-1 bg-[#1b4332]/90 backdrop-blur-xs text-[#fbf9f5] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
            <Sparkles className="size-2.5 text-[#d4a373]" />
            {slugLower.includes("ghee")
              ? "Vedic Bilona"
              : slugLower.includes("mango")
                ? "Pre-Order Batch"
                : "Wood Cold-Pressed"}
          </span>
          {slugLower.includes("ghee") && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
              UV Glass Jar
            </span>
          )}
          {slugLower.includes("mango") && (
            <span className="bg-orange-100 text-orange-900 border border-orange-300 text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs">
              Harvest Batch #1
            </span>
          )}
          {onSale && (
            <span className="bg-[#b91c1c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {t("sale")}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-2 pt-3 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#1c2b1e] group-hover:text-[#2d6a4f] transition-colors line-clamp-2 leading-snug">
            <Link
              href={`${basePath}/products/${product.slug}${categoryId ? `?category_id=${categoryId}` : ""}`}
              className="after:absolute after:inset-0"
              onClick={handleClick}
            >
              {product.name}
            </Link>
          </h3>
        </div>

        <div className="mt-3 pt-2 border-t border-[#f4efea] flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            {displayPrice ? (
              <span className="text-base sm:text-lg font-extrabold text-[#1b4332] tracking-tight">
                {displayPrice}
              </span>
            ) : (
              <HiddenPricePrompt />
            )}
            {onSale && strikethroughPrice && (
              <span className="text-xs text-[#5c6b5e] line-through">
                {strikethroughPrice}
              </span>
            )}
          </div>

          {!product.purchasable && (
            <span className="text-[11px] font-medium text-[#b91c1c] bg-[#fee2e2] px-2 py-0.5 rounded-full">
              {t("outOfStock")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
