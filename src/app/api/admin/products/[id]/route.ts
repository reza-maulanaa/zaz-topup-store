import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/schema";
import { eq } from "drizzle-orm";
<<<<<<< HEAD
import { z } from "zod";

const updateProductSchema = z.object({
  game: z.enum(["mobile_legends", "free_fire"]).optional(),
  category: z.string().min(1).optional(),
  label: z.string().min(1).max(100).optional(),
  diamonds: z.number().int().positive().nullable().optional(),
  bonus: z.string().nullable().optional(),
  price: z.number().int().positive("Harga harus lebih dari 0").optional(),
  originalPrice: z.number().int().positive().nullable().optional(),
  discount: z.number().int().min(0).max(100).nullable().optional(),
  popular: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
});

// PATCH — edit produk
=======

>>>>>>> second
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await req.json();
<<<<<<< HEAD
    const parsed = updateProductSchema.safeParse(body);

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

    const existing = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!existing[0]) {
=======

    const [product] = await db
      .update(products)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

    if (!product) {
>>>>>>> second
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan" },
        { status: 404 },
      );
    }

<<<<<<< HEAD
    const [updated] = await db
      .update(products)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

    return NextResponse.json({ success: true, product: updated });
=======
    return NextResponse.json({ success: true, product });
>>>>>>> second
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

<<<<<<< HEAD
// DELETE — toggle aktif/nonaktif (soft delete)
=======
// ponytail: DELETE toggles isActive instead of deleting — matches adminApi.toggleProduct
>>>>>>> second
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 403 },
      );
    }

    const { id } = await params;

    const existing = await db
<<<<<<< HEAD
      .select({ id: products.id, isActive: products.isActive })
=======
      .select({ isActive: products.isActive })
>>>>>>> second
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!existing[0]) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan" },
        { status: 404 },
      );
    }

<<<<<<< HEAD
    const [updated] = await db
=======
    const [product] = await db
>>>>>>> second
      .update(products)
      .set({ isActive: !existing[0].isActive, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();

<<<<<<< HEAD
    return NextResponse.json({
      success: true,
      product: updated,
      message: updated.isActive
        ? "Produk diaktifkan kembali"
        : "Produk dinonaktifkan",
    });
=======
    const message = product.isActive ? "Produk diaktifkan" : "Produk dinonaktifkan";
    return NextResponse.json({ success: true, product, message });
>>>>>>> second
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
