"use client";

import MobileLegendsHeader from "./components/MobileLegendsHeader";
import HowToOrder from "./components/HowToOrder";
import UserIdForm from "./components/UserIdForm";
import CategoryTabs from "./components/CategoryTabs";
import { ProductGrid } from "./components/ProductGrid";
import { PaymentMethods } from "./components/PaymentMethod";
import { OrderPreview } from "./components/OrderPreview";
import { StickyOrderButton } from "./components/StickyOrderButton";
import { categories } from "./data/categories";
import { useMobileLegendsOrder } from "./hooks/useMobileLegendsOrder";

export default function MobileLegendsPage() {
  const {
    activeCategory,
    setActiveCategory,
    selected,
    userId,
    setUserId,
    serverId,
    setServerId,
    nickname,
    setNickname,
    paymentMethod,
    setPaymentMethod,
    showHowTo,
    setShowHowTo,
    pulse,
    filteredProducts,
    categoryTabsRef,
    handleSelect,
    handleOrder,
  } = useMobileLegendsOrder();

  const currentCategoryLabel =
    categories.find((c) => c.key === activeCategory)?.label ?? "Diamonds";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 pb-48">
        <MobileLegendsHeader />

        <HowToOrder open={showHowTo} onToggle={() => setShowHowTo((v) => !v)} />

        {/* Step 1: ID */}
        <UserIdForm
          userId={userId}
          onUserIdChange={setUserId}
          serverId={serverId}
          onServerIdChange={setServerId}
          nickname={nickname}
          onNicknameChange={setNickname}
        />

        {/* Step 2: Pilih Item */}
        <section className="border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center bg-violet-50 text-sm font-bold text-violet-600">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Pilih Item</h2>
              <p className="text-xs text-slate-400">Geser untuk lihat semua kategori</p>
            </div>
          </div>

          <CategoryTabs
            activeCategory={activeCategory}
            onChange={setActiveCategory}
            tabsRef={categoryTabsRef}
          />

          <div className="mt-3 bg-slate-50 px-4 py-2.5">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
              {currentCategoryLabel}
            </span>
          </div>

          <div className="mt-3">
            <ProductGrid
              items={filteredProducts}
              selected={selected}
              onSelect={handleSelect}
            />
          </div>
        </section>

        {/* Step 3: Pembayaran */}
        <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto w-full max-w-5xl space-y-3">
          {selected && (
            <OrderPreview
              selected={selected}
              userId={userId}
              serverId={serverId}
              paymentMethod={paymentMethod}
              pulse={pulse}
            />
          )}
          <StickyOrderButton disabled={!selected} onClick={handleOrder} />
        </div>
      </div>
    </main>
  );
}
