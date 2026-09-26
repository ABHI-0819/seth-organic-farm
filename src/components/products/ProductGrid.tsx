import type { Product } from "@spree/sdk";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  basePath?: string;
  categoryId?: string;
  listId?: string;
  listName?: string;
  emptyMessage?: string;
  priorityCount?: number;
  /** Optional currency used for analytics in each ProductCard. */
  currency?: string;
}

export function ProductGrid({
  products,
  basePath = "",
  categoryId,
  listId,
  listName,
  emptyMessage,
  priorityCount = 0,
  currency,
}: ProductGridProps) {
  if (products.length === 0 && emptyMessage) {
    return (
      <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-[#e3dcd2] shadow-xs">
        <div className="size-12 mx-auto rounded-full bg-[#e8f3eb] flex items-center justify-center text-lg mb-3">
          🌱
        </div>
        <p className="text-[#5c6b5e] font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          basePath={basePath}
          categoryId={categoryId}
          index={index}
          listId={listId}
          listName={listName}
          fetchPriority={index < priorityCount ? "high" : undefined}
          currency={currency}
        />
      ))}
    </div>
  );
}
