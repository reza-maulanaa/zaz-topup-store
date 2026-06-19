import type { PaymentMethodKey } from "../types/freeFire.types";

export const defaultPaymentMethod: PaymentMethodKey = "Transfer Bank";

export const paymentMethods: Array<{ key: PaymentMethodKey; icon: React.ReactNode }> = [
  { key: "Transfer Bank", icon: "🏦" },
  { key: "QRIS", icon: <img src="/qris.avif" className="h-6 w-6 object-contain" alt="QRIS" /> },
  { key: "COD", icon: <img src="/cod.avif" className="h-6 w-6 object-contain" alt="COD" /> },
  { key: "Dana", icon: <img src="/dana.avif" className="h-6 w-6 object-contain" alt="Dana" /> },
  { key: "GoPay", icon: <img src="/gopay.avif" className="h-6 w-6 object-contain" alt="GoPay" /> },
  { key: "OVO", icon: <img src="/ovo.avif" className="h-6 w-6 object-contain" alt="OVO" /> },
  { key: "ShopeePay", icon: <img src="/shopay.avif" className="h-6 w-6 object-contain" alt="ShopeePay" /> },
  { key: "Lainnya", icon: <img src="/btc.avif" className="h-6 w-6 object-contain" alt="Lainnya" /> },
];
