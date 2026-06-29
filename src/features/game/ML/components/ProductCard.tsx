"use client";

import DiamondIcon from "../icons/DiamondIcon";
import CheckIcon from "../icons/CheckIcon";
import { formatCurrency } from "../utils/formatCurrency";
import type { Nominal } from "../types/mobileLegends.types";

export function ProductCard({
  item,
  selected,
  onSelect,
}: {
  item: Nominal;
  selected: boolean;
  onSelect: (item: Nominal) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className={[
        "relative w-full border p-4 text-left transition-all duration-200",
        selected
          ? "border-violet-400 bg-violet-50 shadow-md shadow-violet-100 ring-1 ring-violet-300"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
      ].join(" ")}
    >
      {/* Discount badge */}
      {item.discount ? (
        <span className="absolute right-0 top-0 bg-red-500 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
          -{item.discount}%
        </span>
      ) : null}

      {/* Popular fire (only if no discount and no selected check) */}
      {item.popular && !item.discount && !selected ? (
        <span className="absolute right-2.5 top-2.5 text-sm">🔥</span>
      ) : null}

      {/* Selected check */}
      {selected ? (
        <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center bg-violet-600 text-white shadow-sm">
          <CheckIcon />
        </span>
      ) : null}

      {item.category === "pass" || item.category === "event" ? (
        /* Pass / Event layout */
        <div className="space-y-1">
          <h3 className="pr-6 text-sm font-bold leading-tight text-slate-900 sm:text-base">
            {item.label}
          </h3>
          {item.bonus ? (
            <p className="text-xs font-semibold text-amber-500">{item.bonus}</p>
          ) : null}
          <p className="pt-1.5 text-base font-bold text-slate-900">
            {formatCurrency(item.price)}
          </p>
          {item.originalPrice ? (
            <p className="text-xs text-slate-400 line-through">
              {formatCurrency(item.originalPrice)}
            </p>
          ) : null}
        </div>
      ) : (
        /* Diamond layout */
        <div className="space-y-1">
          <div className="mb-1">
            <DiamondIcon size={20} />
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {item.diamonds}
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-sky-500">
            Diamonds
          </p>
          {item.bonus ? (
            <p className="text-[11px] font-semibold text-amber-500">+{item.bonus}</p>
          ) : null}
          <p
            className={[
              "pt-1 text-sm font-bold",
              item.category === "muraah" ? "text-emerald-600" : "text-slate-900",
            ].join(" ")}
          >
            {formatCurrency(item.price)}
          </p>
          {item.originalPrice ? (
            <p className="text-xs text-slate-400 line-through">
              {formatCurrency(item.originalPrice)}
            </p>
          ) : null}
        </div>
      )}
    </button>
  );
}
