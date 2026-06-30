import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";

const createProductSchema = z.object({
  game: z.enum(["mobile_legends", "free_fire"]),
  category: z.string().min(1, "Kategori wajib diisi"),
  label: z.string().min(1, "Label wajib diisi").max(100),
  diamonds: z.number().int().positive().optional(),
  bonus: z.string().optional(),
  price: z.number().int().positive("Harga harus lebih dari 0"),
  originalPrice: z.number().int().positive().optional(),
  discount: z.number().int().min(0).max(100).optional(),
  popular: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

// GET — list semua produk (termasuk yang nonaktif, biar admin bisa toggle balik)
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
      .orderBy(desc(products.createdAt));

    return NextResponse.json({ success: true, products: allProducts });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

// POST — tambah produk baru
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
    const parsed = createProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Data tidak valid",
          errors: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const [newProduct] = await db
      .insert(products)
      .values(parsed.data)
      .returning();

    return NextResponse.json(
      { success: true, product: newProduct },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
