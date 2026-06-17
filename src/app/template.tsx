// Re-mounts on every route change, so the page-in animation replays
// for a premium transition between pages.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
