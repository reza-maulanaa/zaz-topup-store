"use client";

import { ProductCard } from "./ProductCard";
import type { Nominal } from "../types/mobileLegends.types";

export function ProductGrid({
  items,
  selected,
  onSelect,
}: {
  items: Nominal[];
  selected: Nominal | null;
  onSelect: (item: Nominal) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-400">
        Tidak ada item tersedia di kategori ini.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <ProductCard
          key={item.id}
          item={item}
          selected={selected?.id === item.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
