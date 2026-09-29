"use client";

import type { Media, Product, Variant } from "@spree/sdk";
import {
  AlertTriangle,
  CircleCheckBig,
  CircleX,
  Loader2,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { QuantityPickerField } from "@/components/cart/QuantityPickerField";
import { HiddenPricePrompt } from "@/components/products/HiddenPricePrompt";
import { MediaGallery } from "@/components/products/MediaGallery";
import { ProductCustomFields } from "@/components/products/ProductCustomFields";
import { VariantPicker } from "@/components/products/VariantPicker";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useHiddenPricing } from "@/contexts/HiddenPricingContext";
import { useStore } from "@/contexts/StoreContext";
import { trackAddToCart, trackViewItem } from "@/lib/analytics/gtm";
import { formatProductPrice } from "@/lib/utils/format";

interface ProductDetailsProps {
  product: Product;
  basePath: string;
}

export function ProductDetails({ product, basePath }: ProductDetailsProps) {
  const { addItem } = useCart();
  const { currency } = useStore();
  const t = useTranslations("products");
  const tw = useTranslations("wholesale");
  // Non-null inside a HiddenPricingProvider (wholesale `prices_hidden`, guest
  // view): prices are null on purpose, and ordering is gated behind sign-in.
  const hiddenPricing = useHiddenPricing();
  const pricesHidden = hiddenPricing !== null;

  // Filter variants list
  const variants = useMemo(() => {
    return (product.variants || []).filter(Boolean);
  }, [product.variants]);

  const hasVariants = variants.length > 0;
  const optionTypes = product.option_types || [];

  // Initialize with default variant or first available variant
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(() => {
    if (product.default_variant) {
      return product.default_variant;
    }
    if (hasVariants) {
      return variants.find((v) => v.purchasable) || variants[0];
    }
    // For products without variants, use default variant
    return product.default_variant || null;
  });

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Track product view (analytics - client-only side effect)
  useEffect(() => {
    trackViewItem(product, currency);
  }, [product, currency]);

  const galleryImages = useMemo((): Media[] => {
    return product.media || [];
  }, [product.media]);

  const variantImageIndex = useMemo((): number | null => {
    if (!selectedVariant) return null;
    const index = galleryImages.findIndex((m) =>
      m.variant_ids.includes(selectedVariant.id),
    );
    return index >= 0 ? index : null;
  }, [selectedVariant, galleryImages]);

  const price = selectedVariant?.price ?? product.price;
  const originalPrice =
    selectedVariant?.original_price ?? product.original_price;
  const displayPrice = price
    ? formatProductPrice(price, currency || "INR", "en-IN")
    : null;

  const currentAmountCents = price?.amount_in_cents;
  const originalAmountCents = originalPrice?.amount_in_cents;
  const compareAtAmountCents = price?.compare_at_amount_in_cents;
  const onSale =
    (currentAmountCents != null &&
      originalAmountCents != null &&
      currentAmountCents < originalAmountCents) ||
    (compareAtAmountCents != null &&
      currentAmountCents != null &&
      currentAmountCents < compareAtAmountCents);

  const strikethroughPrice = onSale
    ? formatProductPrice(
        originalPrice || {
          amount: price?.compare_at_amount,
          currency: price?.currency,
        },
        currency || "INR",
        "en-IN",
      )
    : null;

  const sku = selectedVariant?.sku ?? product.default_variant?.sku;

  // Purchasability
  const isPurchasable = hasVariants
    ? (selectedVariant?.purchasable ?? false)
    : (product.purchasable ?? false);

  const inStock = hasVariants
    ? (selectedVariant?.in_stock ?? false)
    : (product.in_stock ?? false);

  const handleAddToCart = async () => {
    const variantId =
      selectedVariant?.id ||
      product.default_variant?.id ||
      product.default_variant_id;
    if (!variantId) {
      throw new Error("No variant selected");
    }

    setLoading(true);
    await addItem(variantId, quantity);
    setLoading(false);
    trackAddToCart(product, selectedVariant, quantity, currency);
  };

  const weight = selectedVariant?.weight || product.default_variant?.weight;
  const slugLower = product.slug?.toLowerCase() || "";
  const isGhee =
    slugLower.includes("ghee") || product.name?.toLowerCase().includes("ghee");
  const isMango =
    slugLower.includes("mango") ||
    product.name?.toLowerCase().includes("mango");
  const isLowStockTrigger =
    selectedVariant?.sku === "SOF-GHEE-5L" ||
    (selectedVariant?.options_text?.includes("5L") ?? false);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Media Gallery */}
        <div>
          <MediaGallery
            images={galleryImages}
            productName={product.name}
            activeIndex={variantImageIndex}
          />
        </div>

        {/* Product Info */}
        <div>
          {/* Organic Category Badge */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {isGhee
                ? "Vedic Bilona Certified"
                : isMango
                  ? "Seasonal Pre-Order Harvest"
                  : "Wood Cold-Pressed Kachi Ghani"}
            </span>
            <span className="text-[#d4a373] text-xs font-semibold">
              100% Pure Organic
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b4332] leading-tight">
            {product.name}
          </h1>

          {/* Price & Weight */}
          <div className="mt-4 flex flex-wrap items-baseline gap-4">
            {displayPrice ? (
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[#1b4332]">
                  {displayPrice}
                </span>
                {weight && (
                  <span className="text-xs text-[#52796f] font-semibold bg-[#f4efea] px-2.5 py-1 rounded-lg border border-[#e3dcd2]">
                    Weight: {weight} kg
                  </span>
                )}
              </div>
            ) : (
              <HiddenPricePrompt className="inline-flex items-center gap-1.5 text-base font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900" />
            )}
            {onSale && strikethroughPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  {strikethroughPrice}
                </span>
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {t("sale")}
                </span>
              </>
            )}
          </div>

          {/* Low Stock Warning Trigger */}
          {isLowStockTrigger && (
            <div className="flex items-center gap-2.5 p-3.5 my-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-semibold shadow-xs">
              <AlertTriangle className="size-4 text-amber-600 shrink-0" />
              <span>
                Only 5 canisters remaining from this morning's churn batch.
              </span>
            </div>
          )}

          {/* Pre-order Mango Batch Trigger */}
          {isMango && (
            <div className="flex items-center gap-2.5 p-3.5 my-3 bg-orange-50 border border-orange-200 text-orange-950 rounded-xl text-xs font-semibold shadow-xs">
              <Package className="size-4 text-orange-600 shrink-0" />
              <span>
                Harvest Batch #1: Scheduled tree harvest dispatches April 15 -
                April 22.
              </span>
            </div>
          )}

          {/* Packaging & Handling Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-3.5 border-y border-[#e3dcd2] my-5 text-xs text-[#1b4332]">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-[#d4a373] shrink-0" />
              <span className="font-semibold text-[11px] leading-tight">
                UV Glass Packaging
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="size-4 text-[#d4a373] shrink-0" />
              <span className="font-semibold text-[11px] leading-tight">
                Fragile Safe Transit
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#d4a373] shrink-0" />
              <span className="font-semibold text-[11px] leading-tight">
                100% Lab Pure
              </span>
            </div>
          </div>

          {/* Stock Status */}
          <div className="mt-2">
            {isMango ? (
              <span className="inline-flex items-center gap-1.5 text-orange-600 text-xs font-bold">
                <CircleCheckBig className="w-4 h-4" />
                Pre-Order Open for Batch #1
              </span>
            ) : inStock ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                <CircleCheckBig className="w-4 h-4" />
                {t("inStock")} (Jaipur Farm Ready)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-red-600 text-xs font-semibold">
                <CircleX className="w-4 h-4" />
                {t("outOfStock")}
              </span>
            )}
          </div>

          {/* Variant Picker */}
          {hasVariants && optionTypes.length > 0 && (
            <div className="mt-8">
              <VariantPicker
                variants={variants}
                optionTypes={optionTypes}
                selectedVariant={selectedVariant}
                onVariantChange={setSelectedVariant}
              />
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="mt-8">
            {pricesHidden ? (
              // Guest on a prices-hidden channel: no pricing, no ordering —
              // route them through the wholesale sign-in first.
              <Button asChild size="lg">
                <Link href={hiddenPricing.signInHref}>
                  {tw("hiddenPrice.signInToOrder")}
                </Link>
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <QuantityPickerField
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  size="lg"
                />

                {/* Add to Cart Button */}
                <Button
                  size="lg"
                  className="w-full sm:w-auto flex-1"
                  onClick={handleAddToCart}
                  disabled={loading || !isPurchasable}
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      {t("adding")}
                    </>
                  ) : isPurchasable ? (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      {t("addToCart")}
                    </>
                  ) : (
                    t("outOfStock")
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Description */}
          {product.description_html && (
            <div className="mt-10 border-t pt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {t("description")}
              </h2>
              {/* Description is admin-authored HTML from the Spree CMS backend (trusted source) */}
              <div
                className="text-gray-600 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: product.description_html,
                }}
              />
            </div>
          )}

          {/* Custom Fields */}
          <ProductCustomFields customFields={product.custom_fields} />

          {/* Product Details */}
          <div className="mt-8 border-t pt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {t("details")}
            </h2>
            <dl className="space-y-3">
              {sku && (
                <div className="flex">
                  <dt className="w-32 text-gray-500 text-sm">{t("sku")}</dt>
                  <dd className="text-gray-900 text-sm">{sku}</dd>
                </div>
              )}
              {selectedVariant?.options_text && (
                <div className="flex">
                  <dt className="w-32 text-gray-500 text-sm">{t("options")}</dt>
                  <dd className="text-gray-900 text-sm">
                    {selectedVariant.options_text}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
