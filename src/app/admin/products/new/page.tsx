"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/services/api";

const inputCls = "w-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-900/10 placeholder:text-slate-400";

const CATEGORIES: Record<string, { value: string; label: string }[]> = {
  mobile_legends: [
    { value: "pass", label: "MLBB Pass" },
    { value: "event", label: "Event & Starlight" },
    { value: "muraah", label: "Muraah" },
    { value: "diamonds", label: "Diamonds" },
  ],
  free_fire: [
    { value: "membership", label: "Membership" },
    { value: "muraah", label: "Muraah" },
    { value: "diamonds", label: "Diamonds" },
  ],
};

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    game: "mobile_legends",
    category: "pass",
    label: "",
    diamonds: "",
    bonus: "",
    price: "",
    originalPrice: "",
    discount: "",
    popular: false,
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await adminApi.createProduct({
        game: form.game,
        category: form.category,
        label: form.label,
        diamonds: form.diamonds ? Number(form.diamonds) : undefined,
        bonus: form.bonus || undefined,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
        discount: form.discount ? Number(form.discount) : undefined,
        popular: form.popular,
      });
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menambah produk");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-xl">
        <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
          <button onClick={() => router.push("/admin/products")} className="transition hover:text-slate-700">
            Kelola Produk
          </button>
          <span>›</span>
          <span className="font-semibold text-slate-700">Tambah Produk</span>
        </nav>
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Tambah Produk</h1>

        <form onSubmit={handleSubmit} className="space-y-5 border border-slate-200 bg-white p-6 shadow-sm">
          {error && (
            <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Game</label>
              <select
                value={form.game}
                onChange={(e) => setForm({ ...form, game: e.target.value, category: CATEGORIES[e.target.value][0].value })}
                className={inputCls}
              >
                <option value="mobile_legends">Mobile Legends</option>
                <option value="free_fire">Free Fire</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputCls}
              >
                {(CATEGORIES[form.game] ?? []).map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Label</label>
            <input
              type="text"
              required
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="86 Diamond"
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Jumlah Diamond
                <span className="ml-1 font-normal text-slate-400">(opsional)</span>
              </label>
              <input
                type="number"
                min="0"
                value={form.diamonds}
                onChange={(e) => setForm({ ...form, diamonds: e.target.value })}
                placeholder="86"
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Bonus
                <span className="ml-1 font-normal text-slate-400">(opsional)</span>
              </label>
              <input
                type="text"
                value={form.bonus}
                onChange={(e) => setForm({ ...form, bonus: e.target.value })}
                placeholder="+10 bonus"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Harga (Rp)</label>
            <input
              type="number"
              required
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="15000"
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Harga Coret
                <span className="ml-1 font-normal text-slate-400">(opsional)</span>
              </label>
              <input
                type="number"
                min="0"
                value={form.originalPrice}
                onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                placeholder="20000"
                className={inputCls}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Diskon (%)
                <span className="ml-1 font-normal text-slate-400">(opsional)</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.discount}
                onChange={(e) => setForm({ ...form, discount: e.target.value })}
                placeholder="25"
                className={inputCls}
              />
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
            <input
              type="checkbox"
              checked={form.popular}
              onChange={(e) => setForm({ ...form, popular: e.target.checked })}
              className="h-4 w-4 rounded accent-slate-900"
            />
            <div>
              <p className="text-sm font-semibold text-slate-700">Tandai sebagai Populer</p>
              <p className="text-xs text-slate-400">Produk akan ditampilkan dengan badge populer</p>
            </div>
          </label>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="flex-1 border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
            >
              {submitting ? "Menyimpan..." : "Simpan Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
