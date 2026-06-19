import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Akses ditolak" }, { status: 403 });
    }

    const [totalUsers, totalAdmins, latestUsers] = await Promise.all([
      prisma.user.count({ where: { role: "user" } }),
      prisma.user.count({ where: { role: "admin" } }),
      prisma.user.findMany({
        where: { role: "user" },
        orderBy: { createdAt: "desc" },
        take: 10,
        select: { id: true, name: true, email: true, role: true, createdAt: true },
      }),
    ]);

    return NextResponse.json({ success: true, totalUsers, totalAdmins, latestUsers });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
