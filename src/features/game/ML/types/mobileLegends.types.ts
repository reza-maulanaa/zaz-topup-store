export type CategoryKey = "pass" | "event" | "muraah" | "diamonds";

export type PaymentMethodKey =
  | "Transfer Bank"
  | "QRIS"
  | "COD"
  | "Dana"
  | "GoPay"
  | "OVO"
  | "ShopeePay"
  | "Lainnya";

export interface Nominal {
  id: string;
  label: string;
  diamonds: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  bonus?: string;
  popular?: boolean;
  category: CategoryKey;
}
