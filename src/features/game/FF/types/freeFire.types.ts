export type CategoryKey = "membership" | "muraah" | "diamonds";

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

export type PaymentMethodKey =
  | "Transfer Bank"
  | "QRIS"
  | "COD"
  | "Dana"
  | "GoPay"
  | "OVO"
  | "ShopeePay"
  | "Lainnya";
