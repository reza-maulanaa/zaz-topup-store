"use client";

import type { RefObject } from "react";
import type { CategoryKey, Nominal, PaymentMethodKey } from "./types/freeFire.types";
import { categories } from "./data/categories";
import { paymentMethods } from "./data/paymentMethods";
import { formatCurrency } from "./utils/formatCurrency";
import { useFreeFireOrder } from "./hooks/useFreeFireOrder";

// ─── Icons ───────────────────────────────────────────────────────────────────

function DiamondIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L2 9l10 13L22 9z" className="fill-cyan-400/90" />
      <path d="M2 9h20M12 2L7 9l5 13 5-13z" className="stroke-white/50" strokeWidth="1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function WAIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ─── Components ──────────────────────────────────────────────────────────────

function CategoryTabs({
  activeCategory,
  onChange,
  tabsRef,
}: {
  activeCategory: CategoryKey;
  onChange: (value: CategoryKey) => void;
  tabsRef: RefObject<HTMLDivElement | null>;
}) {
  return (
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
              "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-150",
              active
                ? "border-red-200 bg-red-50 text-red-600 shadow-sm"
                : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700",
            ].join(" ")}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

export function FreeFireHeader() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-orange-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-6 -left-4 h-28 w-28 rounded-full bg-red-100/60 blur-3xl" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-100 sm:h-[72px] sm:w-[72px]">
          <img src="/ff.avif" alt="Free Fire" className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 text-[11px] font-bold text-orange-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
            Top Up Tersedia
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Free Fire Indonesia
          </h1>
          <p className="mt-0.5 text-sm text-slate-400">
            Diamond · Membership · Instan via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}

export function HowToOrder({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const steps = [
    "Masukkan User ID & Nickname",
    "Pilih item yang ingin dibeli",
    "Pilih metode pembayaran",
    "Klik tombol Order via WhatsApp",
    "Konfirmasi & transfer ke admin",
    "Diamond masuk dalam 1–15 menit",
  ];
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-slate-50"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-base">
            📋
          </span>
          Cara Order
        </span>
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="border-t border-slate-100 px-5 py-4">
          <ol className="space-y-3">
            {steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-600">
                  {index + 1}
                </span>
                <span className="leading-relaxed text-slate-600">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

export function UserIdForm({
  userId,
  onUserIdChange,
  nickname,
  onNicknameChange,
}: {
  userId: string;
  onUserIdChange: (value: string) => void;
  nickname: string;
  onNicknameChange: (value: string) => void;
}) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-sm font-bold text-orange-600">
          1
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Masukkan ID Akun
          </h2>
          <p className="text-xs text-slate-400">Cek di profil Free Fire kamu</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
            User ID
          </label>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-300 transition focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
            value={userId}
            onChange={(e) => onUserIdChange(e.target.value)}
            placeholder="Contoh: 123456789"
            inputMode="numeric"
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
            Nickname
          </label>
          <input
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-300 transition focus:border-red-300 focus:bg-white focus:ring-2 focus:ring-red-100"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            placeholder="Contoh: ProPlayer123"
          />
        </div>
      </div>

      {userId && nickname && (
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          ID lengkap — lanjut pilih item!
        </div>
      )}
    </section>
  );
}

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
          ? "border-red-400 bg-red-50 shadow-md shadow-red-100 ring-1 ring-red-300"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
      ].join(" ")}
    >
      {item.discount ? (
        <span className="absolute right-0 top-0 rounded-bl-xl rounded-tr-2xl bg-red-500 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
          -{item.discount}%
        </span>
      ) : null}

      {item.popular && !item.discount && !selected ? (
        <span className="absolute right-2.5 top-2.5 text-sm">🔥</span>
      ) : null}

      {selected ? (
        <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow-sm">
          <CheckIcon />
        </span>
      ) : null}

      {item.category === "membership" ? (
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
        <div className="space-y-1">
          <div className="mb-1">
            <DiamondIcon size={20} />
          </div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">
            {item.diamonds}
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-cyan-500">
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
        Tidak ada item di kategori ini.
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
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
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
                "flex items-center gap-2.5 rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition-all duration-150",
                active
                  ? "border-red-300 bg-red-50 text-red-700 shadow-sm ring-1 ring-red-200"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800",
              ].join(" ")}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center text-base leading-none">
                {method.icon}
              </span>
              <span className="truncate text-sm">{method.key}</span>
              {active && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 text-red-600" aria-hidden="true">
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

export function OrderPreview({
  selected,
  userId,
  paymentMethod,
  pulse,
}: {
  selected: Nominal;
  userId: string;
  paymentMethod: PaymentMethodKey;
  pulse: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-150",
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
          <span className="text-slate-400">User ID</span>
          <span className="text-right font-semibold text-slate-900">{userId || "—"}</span>
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

export function StickyOrderButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "flex w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-4 text-sm font-bold shadow-sm transition-all duration-200",
        disabled
          ? "cursor-not-allowed bg-slate-100 text-slate-400"
          : "bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md",
      ].join(" ")}
    >
      <WAIcon size={18} />
      <span>
        {disabled ? "Pilih Item Terlebih Dahulu" : "Order via WhatsApp"}
      </span>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FreeFire() {
  const {
    activeCategory,
    setActiveCategory,
    selected,
    userId,
    setUserId,
    nickname,
    setNickname,
    showHowTo,
    setShowHowTo,
    pulse,
    paymentMethod,
    setPaymentMethod,
    filteredProducts,
    categoryTabsRef,
    handleSelect,
    handleOrder,
  } = useFreeFireOrder();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 pb-48">
        <FreeFireHeader />
        <HowToOrder open={showHowTo} onToggle={() => setShowHowTo((v) => !v)} />

        {/* Step 1: ID */}
        <UserIdForm
          userId={userId}
          onUserIdChange={setUserId}
          nickname={nickname}
          onNicknameChange={setNickname}
        />

        {/* Step 2: Pilih Item */}
        <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Pilih Item</h2>
              <p className="text-xs text-slate-400">Geser untuk lihat semua kategori</p>
            </div>
          </div>

          <CategoryTabs
            activeCategory={activeCategory}
            onChange={setActiveCategory}
            tabsRef={categoryTabsRef}
          />

          <div className="mt-3 rounded-xl bg-slate-50 px-4 py-2.5">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {categories.find((c) => c.key === activeCategory)?.label}
            </span>
          </div>

          <div className="mt-3">
            <ProductGrid
              items={filteredProducts}
              selected={selected}
              onSelect={handleSelect}
            />
          </div>
        </section>

        {/* Step 3: Pembayaran */}
        <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto w-full max-w-5xl space-y-3">
          {selected && (
            <OrderPreview
              selected={selected}
              userId={userId}
              paymentMethod={paymentMethod}
              pulse={pulse}
            />
          )}
          <StickyOrderButton disabled={!selected} onClick={handleOrder} />
        </div>
      </div>
    </main>
  );
}
