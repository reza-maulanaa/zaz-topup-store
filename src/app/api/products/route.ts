import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq, and, asc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const game = req.nextUrl.searchParams.get("game");

  try {
    const where = game
      ? and(eq(products.isActive, true), eq(products.game, game))
      : eq(products.isActive, true);

    const result = await db
      .select()
      .from(products)
      .where(where)
      .orderBy(asc(products.sortOrder), asc(products.createdAt));

    return NextResponse.json({ success: true, products: result });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
