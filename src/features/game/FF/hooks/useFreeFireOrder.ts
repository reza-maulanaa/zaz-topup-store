import { useEffect, useMemo, useRef, useState } from "react";
import type { CategoryKey, Nominal, PaymentMethodKey } from "../types/freeFire.types";
import { nominals } from "../data/nominals";
import { defaultPaymentMethod } from "../data/paymentMethods";
import { getWhatsappNumber, createWhatsAppOrderMessage } from "../utils/whatsapp";

export function useFreeFireOrder() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("membership");
  const [selected, setSelected] = useState<Nominal | null>(null);
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [showHowTo, setShowHowTo] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodKey>(defaultPaymentMethod);

  const categoryTabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = categoryTabsRef.current?.querySelector(
      `[data-cat="${activeCategory}"]`,
    ) as HTMLElement | null;

    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory]);

  const filteredProducts = useMemo(
    () => nominals.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const handleSelect = (nominal: Nominal) => {
    setSelected(nominal);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 350);
  };

  const handleOrder = () => {
    if (!selected) return;

    const waNumber = getWhatsappNumber();
    const message = createWhatsAppOrderMessage({
      selected,
      userId,
      nickname,
      paymentMethod,
    });

    window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
  };

  return {
    activeCategory,
    setActiveCategory,
    selected,
    userId,
    setUserId,
    nickname,
    setNickname,
    showHowTo,
    setShowHowTo,
    pulse,
    paymentMethod,
    setPaymentMethod,
    filteredProducts,
    categoryTabsRef,
    handleSelect,
    handleOrder,
  };
}
