export default function DiamondIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M12 2L2 9l10 13L22 9z" className="fill-sky-400/90" />
      <path
        d="M2 9h20M12 2L7 9l5 13 5-13z"
        className="stroke-white/60"
        strokeWidth="1"
      />
    </svg>
  );
}