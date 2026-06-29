"use client";

import { formatCurrency } from "../utils/formatCurrency";
import type { Nominal, PaymentMethodKey } from "../types/mobileLegends.types";

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
        "border border-slate-200 bg-white shadow-sm transition-transform duration-150",
        pulse ? "scale-[1.015]" : "scale-100",
      ].join(" ")}
    >
      <div className="border-b border-slate-100 px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Ringkasan Pesanan
        </p>
      </div>
      <div className="space-y-2 px-4 py-3">
        <div className="flex items-start justify-between gap-4 text-sm">
          <span className="text-slate-400">Item</span>
          <span className="text-right font-semibold text-slate-900">{selected.label}</span>
        </div>
        <div className="flex items-start justify-between gap-4 text-sm">
          <span className="text-slate-400">ID Akun</span>
          <span className="text-right font-semibold text-slate-900">
            {userId || "—"}
            {serverId ? ` / ${serverId}` : ""}
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 text-sm">
          <span className="text-slate-400">Pembayaran</span>
          <span className="text-right font-semibold text-slate-900">{paymentMethod}</span>
        </div>

        <div className="h-px bg-slate-100" />

        <div className="flex items-center justify-between gap-4 pt-1">
          <span className="text-sm text-slate-400">Total Bayar</span>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {formatCurrency(selected.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
