import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      <div className="relative mb-5">
        <div className="absolute inset-0 blur-2xl bg-[var(--color-electric-500)]/20 rounded-full" />
        <div className="relative size-14 rounded-2xl bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center">
          <Icon className="size-6 text-[var(--color-ink-300)]" strokeWidth={1.75} />
        </div>
      </div>
      <h3 className="text-white font-semibold text-[15px] mb-1.5">{title}</h3>
      <p className="text-[13px] text-[var(--color-ink-500)] max-w-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}
