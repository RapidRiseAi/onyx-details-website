import { ButtonHTMLAttributes } from 'react';

export function Button({ className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`rounded-lg bg-gold px-3 py-2 text-sm font-semibold text-zinc-950 ${className}`} {...props} />;
}
