"use client";

import type { RefObject } from "react";
import type { CategoryKey, Nominal, PaymentMethodKey } from "./types/freeFire.types";
import { categories } from "./data/categories";
import { paymentMethods } from "./data/paymentMethods";
import { formatCurrency } from "./utils/formatCurrency";
import { useFreeFireOrder } from "./hooks/useFreeFireOrder";

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
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="stroke-current" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
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

function CategoryTabs({ activeCategory, onChange, tabsRef }: { activeCategory: CategoryKey; onChange: (value: CategoryKey) => void; tabsRef: RefObject<HTMLDivElement | null>; }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div ref={tabsRef} className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {categories.map((category) => {
          const active = activeCategory === category.key;
          return (
            <button key={category.key} data-cat={category.key} type="button" onClick={() => onChange(category.key)}
              className={["shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition", active ? "border-red-200 bg-red-50 text-red-600" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700"].join(" ")}>
              {category.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function FreeFireHeader() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-sm overflow-hidden">
          <img src="/ff.avif" alt="Free Fire" className="h-full w-full object-cover" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Free Fire Indonesia</h1>
          <p className="mt-1 text-sm text-slate-500">Top Up Diamond · Instan & Aman</p>
        </div>
      </div>
    </section>
  );
}

export function HowToOrder({ open, onToggle }: { open: boolean; onToggle: () => void; }) {
  const steps = ["Masukkan User ID & Nickname", "Pilih item yang ingin dibeli", "Klik tombol Order via WhatsApp", "Konfirmasi & transfer ke admin", "Diamond masuk dalam 1–15 menit"];
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white shadow-sm">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <span className="text-sm font-semibold text-slate-900 sm:text-base">Cara Order</span>
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">▾</span>
      </button>
      {open && (
        <div className="border-t border-slate-200 px-5 py-4">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 text-xs font-bold text-red-600">{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function UserIdForm({ userId, onUserIdChange, nickname, onNicknameChange }: { userId: string; onUserIdChange: (value: string) => void; nickname: string; onNicknameChange: (value: string) => void; }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">1</span>
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Masukkan ID</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">User ID</label>
          <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white" value={userId} onChange={(e) => onUserIdChange(e.target.value)} placeholder="Contoh: 123456789" inputMode="numeric" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Nickname</label>
          <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white" value={nickname} onChange={(e) => onNicknameChange(e.target.value)} placeholder="Contoh: ProPlayer123" />
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ item, selected, onSelect }: { item: Nominal; selected: boolean; onSelect: (item: Nominal) => void; }) {
  return (
    <button type="button" onClick={() => onSelect(item)} className={["relative w-full rounded-2xl border p-4 text-left transition-all duration-200", selected ? "border-blue-500 bg-blue-50 shadow-sm" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"].join(" ")}>
      {item.discount ? <span className="absolute right-0 top-0 rounded-bl-xl rounded-tr-2xl bg-red-500 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">-{item.discount}%</span> : null}
      {item.popular && !item.discount ? <span className="absolute right-3 top-3 text-sm">🔥</span> : null}
      {selected ? <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white"><CheckIcon /></span> : null}
      {item.category === "membership" ? (
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">{item.label}</h3>
          {item.bonus ? <p className="text-xs font-medium text-amber-500">{item.bonus}</p> : null}
          <p className="pt-1 text-base font-bold text-slate-900">{formatCurrency(item.price)}</p>
          {item.originalPrice ? <p className="text-xs text-slate-400 line-through">{formatCurrency(item.originalPrice)}</p> : null}
        </div>
      ) : (
        <div className="space-y-1">
          <div className="mb-1"><DiamondIcon size={20} /></div>
          <div className="text-2xl font-bold tracking-tight text-slate-900">{item.diamonds}</div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-600">Diamonds</p>
          <p className={["pt-1 text-sm font-bold", item.category === "muraah" ? "text-emerald-600" : "text-slate-900"].join(" ")}>{formatCurrency(item.price)}</p>
          {item.originalPrice ? <p className="text-xs text-slate-400 line-through">{formatCurrency(item.originalPrice)}</p> : null}
        </div>
      )}
    </button>
  );
}

export function ProductGrid({ items, selected, onSelect }: { items: Nominal[]; selected: Nominal | null; onSelect: (item: Nominal) => void; }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => <ProductCard key={item.id} item={item} selected={selected?.id === item.id} onSelect={onSelect} />)}
      </div>
    </section>
  );
}

export function PaymentMethods({ value, onChange }: { value: PaymentMethodKey; onChange: (method: PaymentMethodKey) => void; }) {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-sm font-bold text-violet-600">3</span>
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Metode Pembayaran</h2>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {paymentMethods.map((method) => {
          const active = value === method.key;
          return (
            <button key={method.key} type="button" onClick={() => onChange(method.key)} className={["flex items-center gap-2 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition", active ? "border-red-200 bg-red-50 text-red-600" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-800"].join(" ")}>
              <span className="text-base leading-none">{method.icon}</span>
              <span>{method.key}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function OrderPreview({ selected, userId, paymentMethod, pulse }: { selected: Nominal; userId: string; paymentMethod: PaymentMethodKey; pulse: boolean; }) {
  return (
    <div className={["rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-transform", pulse ? "scale-[1.01]" : "scale-100"].join(" ")}>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4 text-sm"><span className="text-slate-500">Item</span><span className="font-semibold text-slate-900">{selected.label}</span></div>
        <div className="flex items-center justify-between gap-4 text-sm"><span className="text-slate-500">ID</span><span className="font-semibold text-slate-900">{userId || "—"}</span></div>
        <div className="flex items-center justify-between gap-4 text-sm"><span className="text-slate-500">Bayar</span><span className="font-semibold text-slate-900">{paymentMethod}</span></div>
        <div className="h-px bg-slate-100" />
        <div className="flex items-center justify-between gap-4 pt-1"><span className="text-sm text-slate-500">Total</span><span className="text-2xl font-bold tracking-tight text-slate-900">{formatCurrency(selected.price)}</span></div>
      </div>
    </div>
  );
}

export function StickyOrderButton({ disabled, onClick }: { disabled: boolean; onClick: () => void; }) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={["flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold transition", disabled ? "cursor-not-allowed bg-slate-100 text-slate-400" : "bg-black text-white hover:-translate-y-0.5 hover:bg-slate-800"].join(" ")}>
      <WAIcon size={18} />
      <span>{disabled ? "Pilih Item Terlebih Dahulu" : "Order via WhatsApp"}</span>
    </button>
  );
}

export default function FreeFire() {
  const { activeCategory, setActiveCategory, selected, userId, setUserId, nickname, setNickname, showHowTo, setShowHowTo, pulse, paymentMethod, setPaymentMethod, filteredProducts, categoryTabsRef, handleSelect, handleOrder } = useFreeFireOrder();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 pb-28">
        <FreeFireHeader />
        <HowToOrder open={showHowTo} onToggle={() => setShowHowTo((v) => !v)} />
        <UserIdForm userId={userId} onUserIdChange={setUserId} nickname={nickname} onNicknameChange={setNickname} />
        <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">2</span>
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Pilih Item</h2>
          </div>
          <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} tabsRef={categoryTabsRef} />
          <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">{categories.find((c) => c.key === activeCategory)?.label}</div>
          <div className="mt-4"><ProductGrid items={filteredProducts} selected={selected} onSelect={handleSelect} /></div>
        </section>
        <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />
        {selected && <OrderPreview selected={selected} userId={userId} paymentMethod={paymentMethod} pulse={pulse} />}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto w-full max-w-5xl">
          {selected && <div className="mb-3"><OrderPreview selected={selected} userId={userId} paymentMethod={paymentMethod} pulse={pulse} /></div>}
          <StickyOrderButton disabled={!selected} onClick={handleOrder} />
        </div>
      </div>
    </main>
  );
}
