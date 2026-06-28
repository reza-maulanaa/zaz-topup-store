import type { PaymentMethodKey } from "../types/freeFire.types";

export const defaultPaymentMethod: PaymentMethodKey = "Transfer Bank";

import Image from "next/image";

export const paymentMethods: Array<{
  key: PaymentMethodKey;
  icon: React.ReactNode;
}> = [
  { key: "Transfer Bank", icon: "🏦" },
  {
    key: "QRIS",
    icon: (
      <Image
        src="/qris.avif"
        width={24}
        height={24}
        className="object-contain"
        alt="QRIS"
      />
    ),
  },
  {
    key: "COD",
    icon: (
      <Image
        src="/cod.avif"
        width={24}
        height={24}
        className="object-contain"
        alt="COD"
      />
    ),
  },
  {
    key: "Dana",
    icon: (
      <Image
        src="/dana.avif"
        width={24}
        height={24}
        className="object-contain"
        alt="Dana"
      />
    ),
  },
  {
    key: "GoPay",
    icon: (
      <Image
        src="/gopay.avif"
        width={24}
        height={24}
        className="object-contain"
        alt="GoPay"
      />
    ),
  },
  {
    key: "OVO",
    icon: (
      <Image
        src="/ovo.avif"
        width={24}
        height={24}
        className="object-contain"
        alt="OVO"
      />
    ),
  },
  {
    key: "ShopeePay",
    icon: (
      <Image
        src="/shopay.avif"
        width={24}
        height={24}
        className="object-contain"
        alt="ShopeePay"
      />
    ),
  },
  {
    key: "Lainnya",
    icon: (
      <Image
        src="/btc.avif"
        width={24}
        height={24}
        className="object-contain"
        alt="Lainnya"
      />
    ),
  },
];
