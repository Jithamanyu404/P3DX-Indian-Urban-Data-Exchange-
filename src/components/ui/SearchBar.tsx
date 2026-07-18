import { Search, X } from "lucide-react";
import { cn } from "@/utils/cn";

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className,
  shortcut,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  shortcut?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 h-10 transition-colors",
        "focus-within:border-[var(--color-electric-500)] focus-within:ring-2 focus-within:ring-[var(--color-electric-500)]/20",
        className
      )}
    >
      <Search className="size-4 text-[var(--color-ink-500)] shrink-0" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[13.5px] text-white placeholder:text-[var(--color-ink-500)] outline-none min-w-0"
      />
      {value ? (
        <button aria-label="Clear search" onClick={() => onChange("")} className="text-[var(--color-ink-500)] hover:text-white transition-colors">
          <X className="size-3.5" />
        </button>
      ) : shortcut ? (
        <kbd className="hidden sm:inline-flex items-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-1.5 py-0.5 text-[10px] text-[var(--color-ink-500)] font-mono">
          {shortcut}
        </kbd>
      ) : null}
    </div>
  );
}
