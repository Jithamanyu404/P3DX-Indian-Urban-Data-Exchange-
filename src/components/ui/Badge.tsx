import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import type { Status } from "@/types";

const statusStyles: Record<Status, string> = {
  active: "bg-emerald-500/12 text-emerald-400 border-emerald-500/20",
  connected: "bg-electric-500/12 text-[var(--color-electric-400)] border-[var(--color-electric-500)]/25 bg-blue-500/10",
  pending: "bg-amber-500/12 text-amber-400 border-amber-500/20",
  expired: "bg-white/5 text-[var(--color-ink-500)] border-white/10",
  revoked: "bg-rose-500/12 text-rose-400 border-rose-500/20",
  degraded: "bg-amber-500/12 text-amber-400 border-amber-500/20",
  offline: "bg-rose-500/12 text-rose-400 border-rose-500/20",
};

const dotStyles: Record<Status, string> = {
  active: "bg-emerald-400",
  connected: "bg-[var(--color-electric-400)]",
  pending: "bg-amber-400",
  expired: "bg-[var(--color-ink-500)]",
  revoked: "bg-rose-400",
  degraded: "bg-amber-400",
  offline: "bg-rose-400",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize",
        statusStyles[status],
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", dotStyles[status], status === "active" && "animate-pulse-soft")} />
      {status}
    </span>
  );
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-2)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-ink-300)]",
        className
      )}
      {...props}
    />
  );
}
