import { formatCurrency } from "./formatCurrency";
import type { Nominal, PaymentMethodKey } from "../types/freeFire.types";

export function getWhatsappNumber() {
  return process.env.NEXT_PUBLIC_WA_NUMBER || "6289502839100";
}

export function createWhatsAppOrderMessage(params: {
  selected: Nominal;
  userId: string;
  nickname: string;
  paymentMethod: PaymentMethodKey;
  codLocation?: string;
}) {
  const { selected, userId, nickname, paymentMethod, codLocation } = params;
  const id = userId || "Belum diisi";
  const nick = nickname || "Belum diisi";
  const locationLine = paymentMethod === "COD" && codLocation
    ? `\nLokasi COD : ${codLocation}`
    : "";

  return encodeURIComponent(
    `Halo Min Zaz! Order Free Fire:\n\n` +
      `Item     : ${selected.label}\n` +
      `User ID  : ${id}\n` +
      `Nickname : ${nick}\n` +
      `Bayar    : ${paymentMethod}${locationLine}\n` +
      `Harga    : ${formatCurrency(selected.price)}\n\n` +
      `Mohon konfirmasi. Terima kasih!`,
  );
}
