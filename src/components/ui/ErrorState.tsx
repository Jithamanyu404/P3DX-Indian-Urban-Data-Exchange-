import { motion } from "framer-motion";
import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this data. Try again, or check back shortly.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      <div className="relative mb-5">
        <div className="absolute inset-0 blur-2xl bg-rose-500/20 rounded-full" />
        <div className="relative size-14 rounded-2xl bg-[var(--color-surface-2)] border border-rose-500/20 flex items-center justify-center">
          <AlertTriangle className="size-6 text-rose-400" strokeWidth={1.75} />
        </div>
      </div>
      <h3 className="text-white font-semibold text-[15px] mb-1.5">{title}</h3>
      <p className="text-[13px] text-[var(--color-ink-500)] max-w-sm mb-6 leading-relaxed">{description}</p>
      {onRetry && (
        <Button size="sm" variant="secondary" icon={<RotateCw className="size-3.5" />} onClick={onRetry}>
          Try again
        </Button>
      )}
    </motion.div>
  );
}
