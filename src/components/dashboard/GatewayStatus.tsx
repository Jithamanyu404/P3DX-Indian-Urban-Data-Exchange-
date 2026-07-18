import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { gateways } from "@/data/generators";

export function GatewayStatus() {
  const top = gateways.slice(0, 5);

  return (
    <Card className="p-0">
      <CardHeader>
        <div>
          <CardTitle>Gateway health</CardTitle>
          <CardDescription>Latency and uptime, live</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-2 space-y-4">
        {top.map((gw, i) => (
          <div key={gw.id}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] text-white font-medium truncate">{gw.name}</span>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11.5px] text-[var(--color-ink-500)] mono">{gw.latencyMs}ms</span>
                <StatusBadge status={gw.status} />
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${gw.uptime}%` }}
                transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-electric-500)] to-[var(--color-violet-500)]"
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
