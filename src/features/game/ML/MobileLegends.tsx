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
    categories.find((category) => category.key === activeCategory)?.label ??
    "Diamonds";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 pb-44">
        <MobileLegendsHeader />

        <HowToOrder open={showHowTo} onToggle={() => setShowHowTo((v) => !v)} />

        <UserIdForm
          userId={userId}
          onUserIdChange={setUserId}
          serverId={serverId}
          onServerIdChange={setServerId}
          nickname={nickname}
          onNicknameChange={setNickname}
        />

        <section className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
              2
            </span>
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
              Pilih Item
            </h2>
          </div>

          <CategoryTabs
            activeCategory={activeCategory}
            onChange={setActiveCategory}
            tabsRef={categoryTabsRef}
          />

          <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
            {currentCategoryLabel}
          </div>

          <div className="mt-4">
            <ProductGrid
              items={filteredProducts}
              selected={selected}
              onSelect={handleSelect}
            />
          </div>
        </section>

        <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />

        <div className="h-1" />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto w-full max-w-5xl">
          {selected ? (
            <div className="mb-3">
              <OrderPreview
                selected={selected}
                userId={userId}
                serverId={serverId}
                paymentMethod={paymentMethod}
                pulse={pulse}
              />
            </div>
          ) : null}

          <StickyOrderButton disabled={!selected} onClick={handleOrder} />
        </div>
      </div>
    </main>
  );
}
