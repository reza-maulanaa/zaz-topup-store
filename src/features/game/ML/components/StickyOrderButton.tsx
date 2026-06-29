"use client";

import WAIcon from "../icons/WAIcon";

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
        "flex w-full items-center justify-center gap-2.5 px-5 py-4 text-sm font-bold shadow-sm transition-all duration-200",
        disabled
          ? "cursor-not-allowed bg-slate-100 text-slate-400"
          : "bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md",
      ].join(" ")}
    >
      <WAIcon size={18} />
      <span>
        {disabled ? "Pilih Item Terlebih Dahulu" : "Order via WhatsApp"}
      </span>
    </button>
  );
}
