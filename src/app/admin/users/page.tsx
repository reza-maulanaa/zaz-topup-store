"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/services/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <svg
          className="h-8 w-8 animate-spin text-slate-300"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-sm text-slate-400">Memuat data users...</p>
      </div>
    </div>
  );
}

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
      {initials}
    </div>
  );
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchUsers = () => {
    setUsers(null);
    adminApi
      .users()
      .then((res) => setUsers(res.users))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Hapus user "${name}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setDeletingId(id);
    try {
      await adminApi.deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus user");
    } finally {
      setDeletingId(null);
    }
  };

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
          <p className="font-bold text-red-700">Gagal memuat data</p>
          <p className="mt-1 text-sm text-red-500">{error}</p>
          <button
            onClick={() => { setError(""); fetchUsers(); }}
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );

  if (!users) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
              <button
                onClick={() => router.push("/admin")}
                className="transition hover:text-slate-700"
              >
                Admin
              </button>
              <span>›</span>
              <span className="font-semibold text-slate-700">Kelola Users</span>
            </nav>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Kelola Users
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {users.length} user terdaftar
            </p>
          </div>
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:self-auto"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Kembali
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">User</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">Email</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">Bergabung</th>
                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} />
                      <span className="font-semibold text-slate-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        disabled={deletingId === user.id}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === user.id ? "Menghapus..." : "Hapus"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-slate-400">Belum ada user terdaftar.</p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 sm:hidden">
          {users.map((user) => (
            <div
              key={user.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-start justify-between p-4">
                <div className="flex items-center gap-3">
                  <UserAvatar name={user.name} />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="truncate text-xs text-slate-400">{user.email}</p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 px-4 py-3">
                <p className="text-xs text-slate-400">
                  Bergabung {new Date(user.createdAt).toLocaleDateString("id-ID")}
                </p>
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    disabled={deletingId === user.id}
                    className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === user.id ? "Menghapus..." : "Hapus"}
                  </button>
                )}
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <p className="text-sm text-slate-400">Belum ada user terdaftar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
