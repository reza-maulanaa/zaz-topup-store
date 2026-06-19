"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/services/api";

interface DashboardData {
  totalUsers: number;
  totalAdmins: number;
  latestUsers: Array<{ id: string; name: string; email: string; role: string; createdAt: string }>;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi.dashboard().then((res) => setData(res)).catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="flex min-h-screen items-center justify-center"><div className="text-red-500">{error}</div></div>;
  if (!data) return <div className="flex min-h-screen items-center justify-center"><div className="text-slate-500">Memuat...</div></div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Overview sistem</p>
          </div>
          <button
            onClick={() => router.push("/admin/users")}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Kelola Users
          </button>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Total Users</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{data.totalUsers}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">Total Admins</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{data.totalAdmins}</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="font-semibold text-slate-900">User Terbaru</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {data.latestUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between px-6 py-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {user.role}
                </span>
              </div>
            ))}
            {data.latestUsers.length === 0 && (
              <p className="px-6 py-4 text-sm text-slate-500">Belum ada user.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
