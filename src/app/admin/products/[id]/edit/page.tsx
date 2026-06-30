"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
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

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<{
    game: string; category: string; label: string;
    diamonds: string; bonus: string; price: string;
    originalPrice: string; discount: string; popular: boolean;
  } | null>(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadProduct = useCallback(() => {
    adminApi
      .products()
      .then((res) => {
        const p = res.products.find((item) => item.id === id);
        if (!p) {
          setError("Produk tidak ditemukan");
          return;
        }
        setForm({
          game: p.game,
          category: p.category,
          label: p.label,
          diamonds: p.diamonds?.toString() ?? "",
          bonus: p.bonus ?? "",
          price: p.price.toString(),
          originalPrice: p.originalPrice?.toString() ?? "",
          discount: p.discount?.toString() ?? "",
          popular: p.popular,
        });
      })
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setError("");
    setSubmitting(true);

    try {
      await adminApi.updateProduct(id, {
        game: form.game,
        category: form.category,
        label: form.label,
        diamonds: form.diamonds ? Number(form.diamonds) : null,
        bonus: form.bonus || null,
        price: Number(form.price),
        originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
        discount: form.discount ? Number(form.discount) : null,
        popular: form.popular,
      });
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan perubahan");
      setSubmitting(false);
    }
  };

  if (error && !form)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );

  if (!form)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-400">Memuat...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-xl">
        <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
          <button onClick={() => router.push("/admin/products")} className="hover:text-slate-700">
            Kelola Produk
          </button>
          <span>›</span>
          <span className="font-semibold text-slate-700">Edit Produk</span>
        </nav>
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Edit Produk</h1>

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
              {submitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
