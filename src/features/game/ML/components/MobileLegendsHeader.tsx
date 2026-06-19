export default function MobileLegendsHeader() {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-violet-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-6 -left-4 h-28 w-28 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-100 sm:h-[72px] sm:w-[72px]">
          <img
            src="/ml.avif"
            alt="Mobile Legends"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <div className="mb-1 inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-0.5 text-[11px] font-bold text-violet-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
            Top Up Tersedia
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Mobile Legends
          </h1>
          <p className="mt-0.5 text-sm text-slate-400">
            Diamond · Starlight · Weekly Pass · Instan via WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
