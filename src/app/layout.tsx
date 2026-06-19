import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "ZAZ Store - Top Up Game Murah & Terpercaya",
  description: "Top up game favorit kamu dengan harga terjangkau. Free Fire, Mobile Legends, dan game lainnya tersedia di ZAZ Store.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
