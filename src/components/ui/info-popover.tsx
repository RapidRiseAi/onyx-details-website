'use client';

import { useEffect, useRef } from 'react';

type InfoPopoverProps = {
  label: string;
  description: string;
};

function closeOtherInfoPopovers(current: HTMLDetailsElement) {
  document
    .querySelectorAll<HTMLDetailsElement>('details[data-info-popover="true"][open]')
    .forEach((popover) => {
      if (popover !== current) {
        popover.open = false;
      }
    });
}

export function InfoPopover({ label, description }: InfoPopoverProps) {
  const popoverRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const popover = popoverRef.current;
      if (!popover || !popover.open) {
        return;
      }

      const target = event.target;
      if (target instanceof Node && !popover.contains(target)) {
        popover.open = false;
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  const handleToggle = () => {
    const popover = popoverRef.current;
    if (!popover || !popover.open) {
      return;
    }

    closeOtherInfoPopovers(popover);
  };

  return (
    <details
      ref={popoverRef}
      data-info-popover="true"
      onToggle={handleToggle}
      className="group relative inline-block shrink-0 align-middle"
    >
      <summary
        className="flex h-5 w-5 cursor-pointer list-none items-center justify-center rounded-full border border-zinc-600 bg-zinc-900 text-[11px] font-semibold text-zinc-200 transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
        aria-label={`More info about ${label}`}
      >
        i
      </summary>
      <div className="absolute right-0 top-7 z-50 hidden w-[min(14rem,calc(100vw-2.5rem))] max-w-[calc(100vw-2.5rem)] rounded-md border border-zinc-700 bg-zinc-950 p-2 text-xs leading-relaxed text-zinc-200 shadow-xl group-open:block md:w-64 md:max-w-none">
        {description}
      </div>
    </details>
  );
}
