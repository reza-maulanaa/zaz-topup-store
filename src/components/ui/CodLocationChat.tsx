"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const MapPicker = dynamic(
  () => import("./MapPicker").then((m) => m.MapPicker),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center bg-slate-100 text-xs text-slate-400">
        Memuat peta...
      </div>
    ),
  },
);

const KETERANGAN_OPTIONS = [
  { label: "Di Rumah", emoji: "🏠" },
  { label: "Di Jalan", emoji: "🛣️" },
  { label: "Di Warung/Toko", emoji: "🏪" },
  { label: "Lainnya", emoji: "✏️" },
];

function combine(address: string, ket: string, custom: string) {
  const note = ket === "Lainnya" ? custom : ket;
  return note ? `${address} (${note})` : address;
}

export function CodLocationChat({
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [address, setAddress] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [customKet, setCustomKet] = useState("");

  const handleAddress = (addr: string) => {
    setAddress(addr);
    onChange(combine(addr, keterangan, customKet));
  };

  const handleKet = (ket: string) => {
    setKeterangan(ket);
    onChange(combine(address, ket, customKet));
  };

  const handleCustomKet = (val: string) => {
    setCustomKet(val);
    onChange(combine(address, keterangan, val));
  };

  return (
    <section className="border border-amber-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-amber-50 text-base">
          📍
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Lokasi COD
          </h2>
          <p className="text-xs text-slate-400">Tandai lokasi kamu di peta</p>
        </div>
      </div>

      <div className="space-y-3 bg-slate-50 p-4">
        {/* Bot bubble 1 */}
        <div className="flex items-start gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-green-500 text-xs font-bold text-white">
            Z
          </div>
          <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-slate-100">
            <p className="text-sm text-slate-700">
              Halo! Untuk COD, ketuk peta di bawah untuk menandai lokasi kamu
              ya 📍
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="ml-9">
          <MapPicker onLocationSelect={handleAddress} />
        </div>

        {/* Address reply bubble */}
        {address && (
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg rounded-tr-none bg-green-500 px-3.5 py-2.5 shadow-sm">
              <p className="text-sm text-white">{address}</p>
            </div>
          </div>
        )}

        {/* Bot bubble 2 — keterangan question, shown after address picked */}
        {address && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center bg-green-500 text-xs font-bold text-white">
              Z
            </div>
            <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white px-3.5 py-2.5 shadow-sm ring-1 ring-slate-100">
              <p className="text-sm text-slate-700">
                Kamu ketemu di mana? 😊
              </p>
            </div>
          </div>
        )}

        {/* Keterangan chips */}
        {address && (
          <div className="ml-9 flex flex-wrap gap-2">
            {KETERANGAN_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleKet(opt.label)}
                className={[
                  "flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold transition-all",
                  keterangan === opt.label
                    ? "border-green-400 bg-green-50 text-green-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                ].join(" ")}
              >
                <span>{opt.emoji}</span>
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Custom keterangan input */}
        {keterangan === "Lainnya" && (
          <div className="ml-9">
            <input
              value={customKet}
              onChange={(e) => handleCustomKet(e.target.value)}
              placeholder="Tulis keterangan lokasi..."
              className="w-full border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-300 transition focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
            />
          </div>
        )}

        {/* Final reply bubble */}
        {keterangan && keterangan !== "Lainnya" && (
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg rounded-tr-none bg-green-500 px-3.5 py-2.5 shadow-sm">
              <p className="text-sm text-white">
                {keterangan} {KETERANGAN_OPTIONS.find((o) => o.label === keterangan)?.emoji}
              </p>
            </div>
          </div>
        )}
        {keterangan === "Lainnya" && customKet && (
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-lg rounded-tr-none bg-green-500 px-3.5 py-2.5 shadow-sm">
              <p className="text-sm text-white">{customKet}</p>
            </div>
          </div>
        )}
      </div>

      {address && keterangan && (
        <p className="mt-3 text-xs text-slate-400">
          Lokasi akan dikirim bersama pesanan via WhatsApp
        </p>
      )}
    </section>
  );
}
