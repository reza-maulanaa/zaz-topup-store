import { useState, useEffect, useMemo, useRef } from "react";
import { DEFAULT_PAYMENT_METHOD } from "../utils/constants";
import { createWhatsAppOrderMessage, getWhatsappNumber } from "../utils/whatsapp";
import type { Nominal, PaymentMethodKey, CategoryKey } from "@/features/game/ML/types/mobileLegends.types";

export function useMobileLegendsOrder() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("pass");
  const [selected, setSelected] = useState<Nominal | null>(null);
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [nickname, setNickname] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodKey>(DEFAULT_PAYMENT_METHOD);
  const [codLocation, setCodLocation] = useState("");
  const [showHowTo, setShowHowTo] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [nominalData, setNominalData] = useState<Nominal[]>([]);

  const categoryTabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("/api/products?game=mobile_legends")
      .then((r) => r.json())
      .then((res) => {
        if (res.products) setNominalData(res.products as Nominal[]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = categoryTabsRef.current?.querySelector(
      `[data-cat="${activeCategory}"]`,
    ) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeCategory]);

  const filteredProducts = useMemo(
    () => nominalData.filter((item) => item.category === activeCategory),
    [nominalData, activeCategory],
  );

  const handleSelect = (nominal: Nominal) => {
    setSelected(nominal);
    setPulse(true);
    window.setTimeout(() => setPulse(false), 350);
  };

  const handleOrder = () => {
    if (!selected) return;
    const message = createWhatsAppOrderMessage({ selected, userId, serverId, nickname, paymentMethod, codLocation });
    window.open(`https://wa.me/${getWhatsappNumber()}?text=${message}`, "_blank");
  };

  return {
    activeCategory, setActiveCategory,
    selected,
    userId, setUserId,
    serverId, setServerId,
    nickname, setNickname,
    paymentMethod, setPaymentMethod,
    codLocation, setCodLocation,
    showHowTo, setShowHowTo,
    pulse,
    filteredProducts,
    categoryTabsRef,
    handleSelect,
    handleOrder,
  };
}
