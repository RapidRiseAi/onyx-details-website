import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}>;

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', className = '', children }: Props) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : ''} ${className}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.1] text-white md:text-4xl">{title}</h2>
      <div className={`gold-divider mt-4 ${centered ? 'mx-auto' : ''}`} />
      {subtitle ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{subtitle}</p> : null}
      {children}
    </div>
  );
}
