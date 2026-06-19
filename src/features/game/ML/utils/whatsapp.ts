import type { Nominal, PaymentMethodKey } from "@/features/game/ML/types/mobileLegends.types";
import { formatCurrency } from "@/features/game/ML/utils/formatCurrency";

export function getWhatsappNumber() {
  return process.env.NEXT_PUBLIC_WA_NUMBER || "6289502839100";
}

export function createWhatsAppOrderMessage(params: {
  selected: Nominal;
  userId: string;
  serverId: string;
  nickname: string;
  paymentMethod: PaymentMethodKey;
}) {
  const { selected, userId, serverId, nickname, paymentMethod } = params;
  const uid = userId || "Belum diisi";
  const sid = serverId || "-";
  const nick = nickname || "Belum diisi";

  return encodeURIComponent(
    `Halo Min Zaz! Order Mobile Legends:\n\n` +
      `Item      : ${selected.label}\n` +
      `User ID   : ${uid}\n` +
      `Server ID : ${sid}\n` +
      `Nickname  : ${nick}\n` +
      `Bayar     : ${paymentMethod}\n` +
      `Harga     : ${formatCurrency(selected.price)}\n\n` +
      `Mohon konfirmasi. Terima kasih!`,
  );
}
