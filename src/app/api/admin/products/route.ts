import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 403 },
      );
    }

    const allProducts = await db
      .select()
      .from(products)
      .orderBy(asc(products.sortOrder), asc(products.createdAt));

    return NextResponse.json({ success: true, products: allProducts });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 403 },
      );
    }

    const body = await req.json();
    const { game, category, label, diamonds, bonus, price, originalPrice, discount, popular } = body;

    if (!game || !category || !label || !price) {
      return NextResponse.json(
        { success: false, message: "Field wajib tidak lengkap" },
        { status: 400 },
      );
    }

    const [product] = await db
      .insert(products)
      .values({ game, category, label, diamonds, bonus, price, originalPrice, discount, popular: popular ?? false, isActive: true })
      .returning();

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
