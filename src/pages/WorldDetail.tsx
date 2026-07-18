import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Users, Lock, Radio, Activity, ShieldCheck } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { worlds } from "@/data/worlds";
import { gateways as allGateways, agents as allAgents } from "@/data/generators";
import { EmptyState } from "@/components/ui/EmptyState";

const trend = Array.from({ length: 14 }).map((_, i) => ({ d: i, v: 400 + Math.round(Math.sin(i / 2) * 120 + i * 20) }));

export default function WorldDetail() {
  const { id } = useParams();
  const world = worlds.find((w) => w.id === id);

  if (!world) {
    return <EmptyState icon={Building2} title="World not found" description="This jurisdiction doesn't exist in the network yet." />;
  }

  const gateways = allGateways.filter((g) => g.world === world.name);
  const agents = allAgents.filter((a) => a.world === world.name).slice(0, 6);

  return (
    <div>
      <Link to="/worlds" className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-ink-500)] hover:text-white transition-colors mb-4">
        <ArrowLeft className="size-3.5" /> Back to World Explorer
      </Link>

      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-[var(--radius-card)] p-7 mb-6 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full blur-[80px]" style={{ background: `${world.color}33` }} />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <StatusBadge status={world.status} />
              <Badge>{world.region}</Badge>
            </div>
            <h1 className="text-[26px] font-semibold text-white tracking-tight">{world.name}</h1>
            <p className="text-[13px] text-[var(--color-ink-500)] mt-1">{world.jurisdiction}</p>
          </div>
          <div className="text-right">
            <p className="text-[28px] font-semibold text-white">{world.uptime}%</p>
            <p className="text-[12px] text-[var(--color-ink-500)]">30-day uptime</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Institutions", value: world.institutions, icon: Building2 },
          { label: "Agents", value: world.agents, icon: Users },
          { label: "Lockers", value: world.lockers, icon: Lock },
          { label: "Gateways", value: world.gateways, icon: Radio },
        ].map((s, i) => (
          <Card key={s.label} interactive glow="electric" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="p-5">
            <s.icon className="size-4 text-[var(--color-electric-400)] mb-3" />
            <AnimatedCounter value={s.value} className="text-[22px] font-semibold text-white" />
            <p className="text-[11.5px] text-[var(--color-ink-500)] mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        <Card className="p-0 xl:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Connection activity</CardTitle>
              <CardDescription>Requests processed over the last 14 days</CardDescription>
            </div>
            <Activity className="size-4 text-[var(--color-ink-500)]" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="worldTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={world.color} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={world.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="d" hide />
                  <Tooltip contentStyle={{ background: "#12141c", border: "1px solid #23262f", borderRadius: 12, fontSize: 12 }} labelFormatter={() => ""} />
                  <Area type="monotone" dataKey="v" stroke={world.color} strokeWidth={2.5} fill="url(#worldTrend)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader>
            <div>
              <CardTitle>Gateways</CardTitle>
              <CardDescription>{gateways.length} endpoints in this world</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-2 space-y-3">
            {gateways.map((gw) => (
              <div key={gw.id} className="flex items-center justify-between rounded-xl px-2 py-2 hover:bg-white/[0.03]">
                <div>
                  <p className="text-[13px] text-white font-medium">{gw.name}</p>
                  <p className="text-[11px] text-[var(--color-ink-500)]">{gw.latencyMs}ms &middot; {gw.throughputMbps} Mbps</p>
                </div>
                <StatusBadge status={gw.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="p-0">
          <CardHeader>
            <div>
              <CardTitle>Agents in this world</CardTitle>
              <CardDescription>Recently active stewards and operators</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-2 space-y-1">
            {agents.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-white/[0.03]">
                <div className="size-8 rounded-full bg-gradient-to-br from-[var(--color-electric-400)] to-[var(--color-violet-500)] flex items-center justify-center text-[11px] font-bold text-white">
                  {a.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-white font-medium truncate">{a.name}</p>
                  <p className="text-[11px] text-[var(--color-ink-500)] truncate">{a.role}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="p-0">
          <CardHeader>
            <div>
              <CardTitle>Policies & permissions</CardTitle>
              <CardDescription>Governance rules applied to this jurisdiction</CardDescription>
            </div>
            <ShieldCheck className="size-4 text-[var(--color-ink-500)]" />
          </CardHeader>
          <CardContent className="pt-2 space-y-3">
            {[
              { label: "Data residency", desc: "All locker data stays within jurisdiction bounds." },
              { label: "Consent expiry", desc: "Grants auto-expire after their agreed duration." },
              { label: "Cross-border sync", desc: world.status === "active" ? "Enabled for approved institutions." : "Currently suspended." },
            ].map((p) => (
              <div key={p.label} className="flex items-start gap-3 rounded-xl px-2 py-2">
                <span className="mt-1.5 size-1.5 rounded-full bg-[var(--color-electric-400)] shrink-0" />
                <div>
                  <p className="text-[13px] text-white font-medium">{p.label}</p>
                  <p className="text-[11.5px] text-[var(--color-ink-500)]">{p.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
