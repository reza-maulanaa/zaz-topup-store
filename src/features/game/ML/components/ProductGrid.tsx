"use client";

import {ProductCard}
from "./ProductCard";

import type {Nominal} 
from '../types/mobileLegends.types'

export function ProductGrid({
  items,
  selected,
  onSelect,
}: {
  items: Nominal[];
  selected: Nominal | null;
  onSelect: (item: Nominal) => void;
}) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
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
    </section>
  );
}
