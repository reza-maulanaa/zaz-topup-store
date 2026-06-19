"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-6 lg:h-24 lg:px-10">
        <Link href="/" className="flex items-center gap-4">
          <img
            src="/zaz.avif"
            alt="ZazStore"
            className="h-11 w-11 rounded-2xl object-cover lg:h-14 lg:w-14"
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 lg:text-2xl">
              ZazStoreId
            </h1>
            <p className="text-sm text-slate-500 lg:text-base">
              Top Up Game Instan & Terpercaya
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="rounded-full bg-purple-50 px-4 py-1.5 text-sm font-medium text-purple-700 transition hover:bg-purple-100"
                >
                  Admin
                </Link>
              )}
              <span className="hidden text-sm font-medium text-slate-700 lg:block">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
