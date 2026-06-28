import { NextResponse } from "next/server";
import { getAuthUser, clearAuthCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function DELETE() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Tidak terautentikasi" },
        { status: 401 },
      );
    }

    await db.delete(users).where(eq(users.id, user.id));
    await clearAuthCookie();

    return NextResponse.json({
      success: true,
      message: "Akun berhasil dihapus",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
