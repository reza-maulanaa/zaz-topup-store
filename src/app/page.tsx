import { Home } from "@/features/home/Home";

export default function HomePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "ZazStore",
      alternateName: "ZazStore.ID",
      description:
        "Toko topup game online terpercaya. Top up Diamond Mobile Legends, Free Fire, dan game lainnya dengan cepat dan murah.",
      url: "https://zazstore.my.id/",
      logo: "https://zazstore.my.id/zaz.avif",
      sameAs: [
        "https://instagram.com/zazstoreid",
        "https://tiktok.com/@zazstoreid",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "ZazStore",
      url: "https://zazstore.my.id/",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  );
}
