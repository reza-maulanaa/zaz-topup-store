export function StepLabel({ number, label }: { number: number; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="inline-flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold">
        {number}
      </span>
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
  );
}
