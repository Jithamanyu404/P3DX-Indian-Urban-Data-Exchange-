import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { notifications } from "@/data/generators";
import { formatRelativeTime } from "@/utils/format";
import { cn } from "@/utils/cn";

const typeColor = {
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  info: "bg-[var(--color-electric-400)]",
  error: "bg-rose-400",
};

export function LiveTimeline() {
  return (
    <Card className="p-0">
      <CardHeader>
        <div>
          <CardTitle>Live timeline</CardTitle>
          <CardDescription>Real-time platform events</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="relative pl-5">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-[var(--color-electric-500)]/50 via-[var(--color-border)] to-transparent" />
          <div className="space-y-5">
            {notifications.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <span
                  className={cn(
                    "absolute -left-5 top-1 size-3 rounded-full ring-4 ring-[var(--color-surface)]",
                    typeColor[n.type],
                    i === 0 && "animate-pulse-soft"
                  )}
                />
                <p className="text-[13px] font-medium text-white">{n.title}</p>
                <p className="text-[12px] text-[var(--color-ink-500)] mt-0.5 leading-relaxed">{n.description}</p>
                <p className="text-[11px] text-[var(--color-ink-700)] mt-1">{formatRelativeTime(n.timestamp)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
