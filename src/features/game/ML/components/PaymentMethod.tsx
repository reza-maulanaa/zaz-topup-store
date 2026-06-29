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
    <section className="border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center bg-violet-50 text-sm font-bold text-violet-600">
          3
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Metode Pembayaran
          </h2>
          <p className="text-xs text-slate-400">Pilih salah satu metode di bawah</p>
        </div>
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
                "flex items-center gap-2.5 border px-3 py-3 text-left text-sm font-semibold transition-all duration-150",
                active
                  ? "border-violet-300 bg-violet-50 text-violet-700 shadow-sm ring-1 ring-violet-200"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800",
              ].join(" ")}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center text-base leading-none">
                {method.icon}
              </span>
              <span className="truncate text-sm">{method.key}</span>
              {active && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto shrink-0 text-violet-600"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
