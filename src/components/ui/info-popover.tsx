type InfoPopoverProps = {
  label: string;
  description: string;
};

export function InfoPopover({ label, description }: InfoPopoverProps) {
  return (
    <details className="group relative inline-block shrink-0 align-middle">
      <summary
        className="flex h-5 w-5 cursor-pointer list-none items-center justify-center rounded-full border border-zinc-600 bg-zinc-900 text-[11px] font-semibold text-zinc-200 transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
        aria-label={`More info about ${label}`}
      >
        i
      </summary>
      <div className="absolute right-0 top-7 z-50 hidden w-56 rounded-md border border-zinc-700 bg-zinc-950 p-2 text-xs leading-relaxed text-zinc-200 shadow-xl group-open:block md:w-64">
        {description}
      </div>
    </details>
  );
}
