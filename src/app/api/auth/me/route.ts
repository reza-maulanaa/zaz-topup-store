import { NextResponse } from "next/server";
import { getAuthUser, clearAuthCookie } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      await clearAuthCookie();
      return NextResponse.json({ success: false, message: "Tidak terautentikasi" }, { status: 401 });
    }
    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 });
  }
}
