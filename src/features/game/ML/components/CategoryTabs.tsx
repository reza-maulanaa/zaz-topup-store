"use client";

import { categories } from "@/features/game/ML/data/categories";
import type { CategoryKey } from "@/features/game/ML/types/mobileLegends.types";
import { type RefObject } from "react";

export default function CategoryTabs({
  activeCategory,
  onChange,
  tabsRef,
}: {
  activeCategory: CategoryKey;
  onChange: (value: CategoryKey) => void;
  tabsRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div
        ref={tabsRef}
        className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]"
      >
        {categories.map((category) => {
          const active = activeCategory === category.key;
          return (
            <button
              key={category.key}
              data-cat={category.key}
              type="button"
              onClick={() => onChange(category.key)}
              className={[
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                active
                  ? "border-red-200 bg-red-50 text-red-600 shadow-sm"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700",
              ].join(" ")}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
