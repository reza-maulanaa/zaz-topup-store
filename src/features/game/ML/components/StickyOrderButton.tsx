"use client";

import WAIcon
from "../icons/WAIcon";

export function StickyOrderButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-semibold transition",
        disabled
          ? "cursor-not-allowed bg-slate-100 text-slate-400"
          : "bg-black text-white hover:-translate-y-0.5 hover:bg-slate-800",
      ].join(" ")}
    >
      <WAIcon size={18} />
      <span>
        {disabled ? "Pilih Item Terlebih Dahulu" : "Order via WhatsApp"}
      </span>
    </button>
  );
}