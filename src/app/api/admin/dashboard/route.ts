import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq, count, desc } from "drizzle-orm";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Akses ditolak" },
        { status: 403 },
      );
    }

    const [totalUsersResult, totalAdminsResult, latestUsers] =
      await Promise.all([
        db.select({ total: count() }).from(users).where(eq(users.role, "user")),

        db
          .select({ total: count() })
          .from(users)
          .where(eq(users.role, "admin")),

        db
          .select({
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            createdAt: users.createdAt,
          })
          .from(users)
          .where(eq(users.role, "user"))
          .orderBy(desc(users.createdAt))
          .limit(10),
      ]);

    return NextResponse.json({
      success: true,
      totalUsers: totalUsersResult[0].total,
      totalAdmins: totalAdminsResult[0].total,
      latestUsers,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
