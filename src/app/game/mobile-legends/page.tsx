import MobileLegends from "@/features/game/ML/MobileLegends";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Top Up Mobile Legends - ZAZ Store",
  description: "Top up Mobile Legends diamond dengan harga murah dan proses cepat.",
};

export default function MobileLegendsPage() {
  return (
    <>
      <Header />
      <MobileLegends />
      <Footer />
    </>
  );
}
