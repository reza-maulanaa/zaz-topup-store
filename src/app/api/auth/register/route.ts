import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { authLimiter, checkRateLimit, getClientIp } from "@/lib/ratelimit";
import { registerSchema, parseBody } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    if (!(await checkRateLimit(authLimiter, getClientIp(req)))) {
      return NextResponse.json(
        { success: false, message: "Terlalu banyak percobaan. Coba lagi sebentar." },
        { status: 429 }
      );
    }

    const parsed = parseBody(registerSchema, await req.json());
    if (!parsed.ok) {
      return NextResponse.json({ success: false, message: parsed.error }, { status: 400 });
    }
    const { name, email, password } = parsed.data;

    const existing = await db.select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existing[0]) {
      return NextResponse.json(
        { success: false, message: "Email sudah terdaftar" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await db.insert(users).values({ name, email, password: hashedPassword });

    return NextResponse.json(
      { success: true, message: "Register berhasil" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}