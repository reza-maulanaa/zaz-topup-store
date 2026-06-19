export default function MobileLegendsHeader() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-violet-100 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-sky-100 blur-3xl" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-sm">
          <img src="/ml.avif" alt="Mobile Legends" className="h-full w-full object-cover" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Mobile Legends
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Top Up Diamond · Instan & Aman via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
