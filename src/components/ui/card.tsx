import { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <article className={`rounded-xl border border-zinc-800 bg-zinc-900 p-4 ${className}`} {...props} />;
}
