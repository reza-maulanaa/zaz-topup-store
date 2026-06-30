"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/services/api";

interface Product {
  id: string;
  game: string;
  category: string;
  label: string;
  diamonds: number | null;
  bonus: string | null;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  popular: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

const GAME_LABELS: Record<string, string> = {
  mobile_legends: "Mobile Legends",
  free_fire: "Free Fire",
};

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchProducts = useCallback(() => {
    setProducts(null);
    adminApi
      .products()
      .then((res) => setProducts(res.products))
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  const handleToggle = async (id: string) => {
    setTogglingId(id);
    try {
      await adminApi.toggleProduct(id);
      fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengubah status produk");
    } finally {
      setTogglingId(null);
    }
  };

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <p className="font-bold text-red-700">Gagal memuat data</p>
          <p className="mt-1 text-sm text-red-500">{error}</p>
          <button
            onClick={() => { setError(""); fetchProducts(); }}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );

  if (!products)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-400">Memuat produk...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
              <button onClick={() => router.push("/admin")} className="hover:text-slate-700">
                Admin
              </button>
              <span>›</span>
              <span className="font-semibold text-slate-700">Kelola Produk</span>
            </nav>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Kelola Produk
            </h1>
            <p className="mt-1 text-sm text-slate-500">{products.length} produk terdaftar</p>
          </div>
          <div className="flex gap-2 self-start sm:self-auto">
            <button
              onClick={() => router.push("/admin")}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Kembali
            </button>
            <button
              onClick={() => router.push("/admin/products/new")}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-700"
            >
              + Tambah Produk
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">Produk</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">Game</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">Harga</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((p) => (
                <tr key={p.id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{p.label}</p>
                    <p className="text-xs text-slate-400">{p.category}{p.diamonds ? ` · ${p.diamonds} diamonds` : ""}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{GAME_LABELS[p.game] ?? p.game}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-900">{formatPrice(p.price)}</p>
                    {p.originalPrice && (
                      <p className="text-xs text-slate-400 line-through">{formatPrice(p.originalPrice)}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                      p.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"
                    }`}>
                      {p.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                    {p.popular && (
                      <span className="ml-2 inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700">
                        Populer
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => router.push(`/admin/products/${p.id}/edit`)}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggle(p.id)}
                        disabled={togglingId === p.id}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition disabled:opacity-50 ${
                          p.isActive
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                      >
                        {togglingId === p.id ? "..." : p.isActive ? "Nonaktifkan" : "Aktifkan"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-slate-400">Belum ada produk.</p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 sm:hidden">
          {products.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{p.label}</p>
                    <p className="text-xs text-slate-400">{GAME_LABELS[p.game] ?? p.game} · {p.category}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      p.isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400"
                    }`}>
                      {p.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                    {p.popular && (
                      <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                        Populer
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-2 font-semibold text-slate-900">{formatPrice(p.price)}</p>
              </div>
              <div className="flex gap-2 border-t border-slate-50 px-4 py-3">
                <button
                  onClick={() => router.push(`/admin/products/${p.id}/edit`)}
                  className="flex-1 rounded-lg bg-slate-100 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleToggle(p.id)}
                  disabled={togglingId === p.id}
                  className={`flex-1 rounded-lg py-2 text-xs font-bold transition disabled:opacity-50 ${
                    p.isActive
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-green-50 text-green-600 hover:bg-green-100"
                  }`}
                >
                  {togglingId === p.id ? "..." : p.isActive ? "Nonaktifkan" : "Aktifkan"}
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <p className="text-sm text-slate-400">Belum ada produk.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
