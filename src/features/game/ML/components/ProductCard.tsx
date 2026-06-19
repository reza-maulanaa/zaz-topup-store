"use client";

import DiamondIcon
from "../icons/DiamondIcon";

import CheckIcon
from "../icons/CheckIcon";

import { formatCurrency }
from "../utils/formatCurrency";

import type { Nominal }
from '../types/mobileLegends.types'

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
        "relative w-full rounded-2xl border p-4 text-left transition-all duration-200",
        selected
          ? "border-blue-500 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm",
      ].join(" ")}
    >
      {item.discount ? (
        <span className="absolute right-0 top-0 rounded-bl-xl rounded-tr-2xl bg-red-500 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
          -{item.discount}%
        </span>
      ) : null}

      {item.popular && !item.discount ? (
        <span className="absolute right-3 top-3 text-sm">🔥</span>
      ) : null}

      {selected ? (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
          <CheckIcon />
        </span>
      ) : null}

      {item.category === "pass" || item.category === "event" ? (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
            {item.label}
          </h3>

          {item.bonus ? (
            <p className="text-xs font-medium text-amber-500">{item.bonus}</p>
          ) : null}

          <p className="pt-1 text-base font-bold text-slate-900">
            {formatCurrency(item.price)}
          </p>

          {item.originalPrice ? (
            <p className="text-xs text-slate-400 line-through">
              {formatCurrency(item.originalPrice)}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="space-y-1">
          <div className="mb-1">
            <DiamondIcon size={20} />
          </div>

          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {item.diamonds}
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
            Diamonds
          </p>

          <p
            className={[
              "pt-1 text-sm font-bold",
              item.category === "muraah"
                ? "text-emerald-600"
                : "text-slate-900",
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
