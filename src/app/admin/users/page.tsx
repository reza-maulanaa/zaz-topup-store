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

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const fetchUsers = () => {
    adminApi.users().then((res) => setUsers(res.users)).catch((err) => setError(err.message));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Hapus user "${name}"?`)) return;
    try {
      await adminApi.deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus user");
    }
  };

  if (error) return <div className="flex min-h-screen items-center justify-center"><div className="text-red-500">{error}</div></div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Kelola Users</h1>
            <p className="text-sm text-slate-500">Semua user yang terdaftar</p>
          </div>
          <button
            onClick={() => router.push("/admin")}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Kembali
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 font-medium text-slate-600">Nama</th>
                <th className="px-6 py-3 font-medium text-slate-600">Email</th>
                <th className="px-6 py-3 font-medium text-slate-600">Role</th>
                <th className="px-6 py-3 font-medium text-slate-600">Dibuat</th>
                <th className="px-6 py-3 text-right font-medium text-slate-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                  <td className="px-6 py-4 text-slate-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-slate-100 text-slate-600"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="px-6 py-8 text-center text-sm text-slate-500">Belum ada user.</p>
          )}
        </div>
      </div>
    </div>
  );
}
