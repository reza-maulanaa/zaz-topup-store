"use client";

import { formatCurrency }
from "../utils/formatCurrency";

import type {Nominal, PaymentMethodKey} 
from '../types/mobileLegends.types'

export function OrderPreview({
  selected,
  userId,
  serverId,
  paymentMethod,
  pulse,
}: {
  selected: Nominal;
  userId: string;
  serverId: string;
  paymentMethod: PaymentMethodKey;
  pulse: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-transform",
        pulse ? "scale-[1.01]" : "scale-100",
      ].join(" ")}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-500">Item</span>
          <span className="font-semibold text-slate-900">{selected.label}</span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-500">ID</span>
          <span className="font-semibold text-slate-900">
            {userId || "—"}
            {serverId ? ` / ${serverId}` : ""}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-500">Bayar</span>
          <span className="font-semibold text-slate-900">{paymentMethod}</span>
        </div>

        <div className="h-px bg-slate-100" />

        <div className="flex items-center justify-between gap-4 pt-1">
          <span className="text-sm text-slate-500">Total</span>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {formatCurrency(selected.price)}
          </span>
        </div>
      </div>
    </div>
  );
}