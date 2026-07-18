import { motion } from "framer-motion";
import { PlusCircle, ShieldCheck, Radio, Users, type LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

const actions: { label: string; icon: LucideIcon; accent: string }[] = [
  { label: "Invite agent", icon: Users, accent: "from-[var(--color-electric-400)] to-[var(--color-electric-600)]" },
  { label: "New consent", icon: ShieldCheck, accent: "from-[var(--color-violet-400)] to-[var(--color-violet-600)]" },
  { label: "Deploy gateway", icon: Radio, accent: "from-[var(--color-emerald-400)] to-[var(--color-emerald-600)]" },
  { label: "Create locker", icon: PlusCircle, accent: "from-amber-400 to-amber-600" },
];

export function QuickActions() {
  return (
    <Card className="p-0">
      <CardHeader>
        <div>
          <CardTitle>Quick actions</CardTitle>
          <CardDescription>Common tasks, one click away</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-3 grid grid-cols-2 gap-3">
        {actions.map((a, i) => (
          <motion.button
            key={a.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 text-left hover:border-[#2c3040] transition-colors"
          >
            <div className={`size-9 rounded-xl bg-gradient-to-br ${a.accent} flex items-center justify-center`}>
              <a.icon className="size-4 text-white" strokeWidth={2} />
            </div>
            <span className="text-[12.5px] font-medium text-white">{a.label}</span>
          </motion.button>
        ))}
      </CardContent>
    </Card>
  );
}

export function ActivityHeatmap() {
  const weeks = 18;
  const days = 7;
  const cells = Array.from({ length: weeks * days }).map(() => Math.floor(Math.random() * 5));

  const shade = (v: number) =>
    ["bg-white/[0.04]", "bg-[var(--color-electric-900,#0d2454)]", "bg-[var(--color-electric-700)]/60", "bg-[var(--color-electric-500)]/80", "bg-[var(--color-electric-400)]"][v];

  return (
    <Card className="p-0">
      <CardHeader>
        <div>
          <CardTitle>Activity heatmap</CardTitle>
          <CardDescription>Requests processed per day, last 18 weeks</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-1">
          {cells.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.003 }}
              className={`size-[11px] rounded-[3px] ${shade(v)}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-end gap-1.5 mt-3">
          <span className="text-[10.5px] text-[var(--color-ink-500)]">Less</span>
          {[0, 1, 2, 3, 4].map((v) => (
            <div key={v} className={`size-[10px] rounded-[3px] ${shade(v)}`} />
          ))}
          <span className="text-[10.5px] text-[var(--color-ink-500)]">More</span>
        </div>
      </CardContent>
    </Card>
  );
}
