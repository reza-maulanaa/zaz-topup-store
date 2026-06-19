"use client";

import { paymentMethods } from "../data/paymentMethods";
import type { PaymentMethodKey } from "../types/mobileLegends.types";

export function PaymentMethods({
  value,
  onChange,
}: {
  value: PaymentMethodKey;
  onChange: (method: PaymentMethodKey) => void;
}) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-sm font-bold text-violet-600">
          3
        </span>
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
          Metode Pembayaran
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {paymentMethods.map((method) => {
          const active = value === method.key;

          return (
            <button
              key={method.key}
              type="button"
              onClick={() => onChange(method.key)}
              className={[
                "flex items-center gap-2 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition",
                active
                  ? "border-red-200 bg-red-50 text-red-600 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-800",
              ].join(" ")}
            >
              <span className="text-base leading-none">{method.icon}</span>
              <span>{method.key}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
