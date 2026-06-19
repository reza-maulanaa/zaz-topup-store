import FreeFire from "@/features/game/FF/FreeFire";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Top Up Free Fire - ZAZ Store",
  description: "Top up Free Fire diamond dengan harga murah dan proses cepat.",
};

export default function FreeFirePage() {
  return (
    <>
      <Header />
      <FreeFire />
      <Footer />
    </>
  );
}
