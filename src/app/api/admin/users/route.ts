import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const authUser = await getAuthUser();
    if (!authUser || authUser.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 403 },
      );
    }

    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    return NextResponse.json({ success: true, users: allUsers });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
