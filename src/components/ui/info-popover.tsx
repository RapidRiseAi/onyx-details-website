'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type InfoPopoverProps = {
  label: string;
  description: string;
};

let activePopoverCloser: null | (() => void) = null;

export function InfoPopover({ label, description }: InfoPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const closePopover = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openPopover = useCallback(() => {
    if (activePopoverCloser && activePopoverCloser !== closePopover) {
      activePopoverCloser();
    }

    activePopoverCloser = closePopover;
    setIsOpen(true);
  }, [closePopover]);

  useEffect(() => {
    if (!isOpen) {
      if (activePopoverCloser === closePopover) {
        activePopoverCloser = null;
      }
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const popover = popoverRef.current;
      if (!popover) {
        return;
      }

      const target = event.target;
      if (target instanceof Node && !popover.contains(target)) {
        closePopover();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopover();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closePopover, isOpen]);

  const handleToggle = () => {
    if (isOpen) {
      closePopover();
      return;
    }

    openPopover();
  };

  return (
    <div
      ref={popoverRef}
      data-info-popover="true"
      className="group relative inline-block shrink-0 align-middle"
    >
      <button
        type="button"
        onClick={handleToggle}
        className="flex h-5 w-5 cursor-pointer list-none items-center justify-center rounded-full border border-zinc-600 bg-zinc-900 text-[11px] font-semibold text-zinc-200 transition hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
        aria-label={`More info about ${label}`}
      >
        i
      </button>
      <div
        className={`absolute right-0 top-7 z-50 w-[min(14rem,calc(100vw-2.5rem))] max-w-[calc(100vw-2.5rem)] rounded-md border border-zinc-700 bg-zinc-950 p-2 text-xs leading-relaxed text-zinc-200 shadow-xl md:w-64 md:max-w-none ${isOpen ? 'block' : 'hidden'}`}
      >
        {description}
      </div>
    </div>
  );
}
