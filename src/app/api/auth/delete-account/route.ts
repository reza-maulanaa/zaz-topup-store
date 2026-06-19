import { NextResponse } from "next/server";
import { getAuthUser, clearAuthCookie } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Tidak terautentikasi" }, { status: 401 });
    }

    await prisma.user.delete({ where: { id: user.id } });
    await clearAuthCookie();

    return NextResponse.json({ success: true, message: "Akun berhasil dihapus" });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
