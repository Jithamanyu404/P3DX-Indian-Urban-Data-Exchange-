import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { cn } from "@/utils/cn";

export function StatCard({
  label,
  value,
  delta,
  prefix,
  suffix,
  icon: Icon,
  accent = "electric",
  index = 0,
}: {
  label: string;
  value: number;
  delta: number;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  accent?: "electric" | "violet" | "emerald";
  index?: number;
}) {
  const positive = delta >= 0;
  const accentGrad = {
    electric: "from-[var(--color-electric-400)] to-[var(--color-electric-600)]",
    violet: "from-[var(--color-violet-400)] to-[var(--color-violet-600)]",
    emerald: "from-[var(--color-emerald-400)] to-[var(--color-emerald-600)]",
  }[accent];

  return (
    <Card
      interactive
      glow={accent === "violet" ? "violet" : "electric"}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="p-6"
    >
      <div className="flex items-start justify-between mb-5">
        <span className="text-[13px] text-[var(--color-ink-500)] font-medium">{label}</span>
        <div className={cn("size-9 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg", accentGrad)}>
          <Icon className="size-4 text-white" strokeWidth={2} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} className="text-[28px] font-semibold text-white tracking-tight" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={cn(
            "flex items-center gap-0.5 text-[12px] font-semibold rounded-full px-1.5 py-0.5",
            positive ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"
          )}
        >
          {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {Math.abs(delta)}%
        </motion.span>
      </div>
    </Card>
  );
}
