/**
 * Global loading skeleton — shown while any page segment is loading.
 * Uses Idaara brand tokens (--stamp-green, --ink) from globals.css.
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--ink)]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-[var(--stamp-green)]/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--stamp-green)] animate-spin" />
        </div>
        {/* Skeleton lines */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-2 w-32 rounded-full bg-white/5 animate-pulse" />
          <div className="h-2 w-20 rounded-full bg-white/5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
