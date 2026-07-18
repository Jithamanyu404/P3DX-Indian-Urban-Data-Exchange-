import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Radio, Activity, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { gateways, transactions } from "@/data/generators";
import { formatRelativeTime, formatCompact } from "@/utils/format";

function FlowLine({ index, active }: { index: number; active: boolean }) {
  const y = 30 + index * 26;
  return (
    <g>
      <line x1="20" y1={y} x2="380" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
      {active && (
        <motion.circle
          r="3.5"
          fill="var(--color-electric-400)"
          initial={{ cx: 20, cy: y, opacity: 0 }}
          animate={{ cx: [20, 380], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.25, ease: "linear" }}
        />
      )}
    </g>
  );
}

export default function Gateways() {
  const [activeGateway, setActiveGateway] = useState(gateways[0]?.id);
  const selected = gateways.find((g) => g.id === activeGateway) ?? gateways[0];
  const recentReqs = useMemo(() => transactions.slice(0, 8), []);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h1 className="text-[22px] font-semibold text-white tracking-tight">Gateway network</h1>
        <p className="text-[13px] text-[var(--color-ink-500)] mt-1">Live data flow, latency, and health across {gateways.length} gateways</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <Card className="p-0 xl:col-span-1 max-h-[600px] flex flex-col">
          <CardHeader>
            <div>
              <CardTitle>All gateways</CardTitle>
              <CardDescription>Select to inspect</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-2 overflow-y-auto space-y-1.5">
            {gateways.map((gw) => (
              <button
                key={gw.id}
                onClick={() => setActiveGateway(gw.id)}
                className={`w-full text-left flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                  gw.id === activeGateway ? "bg-[var(--color-electric-500)]/12 border border-[var(--color-electric-500)]/30" : "hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <div className="relative size-8 rounded-lg bg-[var(--color-surface-2)] flex items-center justify-center shrink-0">
                  <Radio className="size-3.5 text-[var(--color-electric-400)]" />
                  {gw.status === "active" && <span className="absolute -top-1 -right-1 size-2 rounded-full bg-emerald-400 animate-pulse-soft" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-medium text-white truncate">{gw.name}</p>
                  <p className="text-[11px] text-[var(--color-ink-500)]">{gw.latencyMs}ms</p>
                </div>
                <StatusBadge status={gw.status} />
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="xl:col-span-2 space-y-5">
          {selected && (
            <Card className="p-6 relative overflow-hidden" glow="electric">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-[16px] font-semibold text-white">{selected.name}</h3>
                  <p className="text-[12.5px] text-[var(--color-ink-500)] mt-0.5">{selected.region} region &middot; {selected.world}</p>
                </div>
                <StatusBadge status={selected.status} />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Latency", value: `${selected.latencyMs}ms`, icon: Zap },
                  { label: "Throughput", value: `${formatCompact(selected.throughputMbps)} Mbps`, icon: Activity },
                  { label: "Uptime", value: `${selected.uptime}%`, icon: Radio },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-3.5">
                    <s.icon className="size-3.5 text-[var(--color-electric-400)] mb-2" />
                    <p className="text-[15px] font-semibold text-white">{s.value}</p>
                    <p className="text-[10.5px] text-[var(--color-ink-500)]">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="relative rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-bg)]/60 p-4">
                <p className="text-[11px] text-[var(--color-ink-500)] mb-2">Live packet flow &middot; source \u2192 gateway</p>
                <svg viewBox="0 0 400 160" className="w-full h-40">
                  <text x="4" y="12" fill="#7d8296" fontSize="8">CLIENTS</text>
                  <text x="356" y="12" fill="#7d8296" fontSize="8">GATEWAY</text>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <FlowLine key={i} index={i} active={selected.status === "active"} />
                  ))}
                  <circle cx="390" cy="83" r="10" fill="url(#gwGlow)" />
                  <defs>
                    <radialGradient id="gwGlow">
                      <stop offset="0%" stopColor="var(--color-electric-400)" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="var(--color-electric-400)" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </Card>
          )}

          <Card className="p-0">
            <CardHeader>
              <div>
                <CardTitle>Recent requests</CardTitle>
                <CardDescription>Latest traffic through this network</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-2 space-y-1">
              {recentReqs.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-xl px-2 py-2 hover:bg-white/[0.03]">
                  <div className="min-w-0">
                    <p className="text-[12.5px] text-white font-medium truncate">{r.agent}</p>
                    <p className="text-[11px] text-[var(--color-ink-500)] truncate">{r.type} &middot; {r.gateway}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <StatusBadge status={r.status} />
                    <p className="text-[10.5px] text-[var(--color-ink-700)] mt-1">{formatRelativeTime(r.timestamp)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
