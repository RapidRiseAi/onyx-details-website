import { PropsWithChildren } from 'react';

export function Section({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <section className={`space-y-3 ${className}`}>{children}</section>;
}
