import { motion } from "framer-motion";
import { Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function WelcomeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col md:flex-row md:items-center justify-between gap-5 mb-7 rounded-[var(--radius-card)] glass p-7 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-[var(--color-electric-500)]/20 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 size-72 rounded-full bg-[var(--color-violet-500)]/15 blur-[90px]" />

      <div className="relative">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11.5px] text-[var(--color-ink-300)] mb-3">
          <Sparkles className="size-3 text-[var(--color-electric-400)]" />
          All systems operational
        </div>
        <h1 className="text-[26px] md:text-[30px] font-semibold tracking-tight text-white">
          Good afternoon, Jordan.
        </h1>
        <p className="text-[14px] text-[var(--color-ink-500)] mt-1.5 max-w-md">
          Your network spans 8 worlds and 32 gateways today. Here's what changed overnight.
        </p>
      </div>

      <div className="relative flex items-center gap-2.5 shrink-0">
        <Button variant="secondary" size="md" icon={<Download className="size-4" />}>
          Export report
        </Button>
        <Button size="md" icon={<Sparkles className="size-4" />}>
          New connection
        </Button>
      </div>
    </motion.div>
  );
}
