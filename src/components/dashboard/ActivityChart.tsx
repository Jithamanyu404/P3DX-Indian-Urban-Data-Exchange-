import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const data = [
  { day: "Mon", reads: 4200, writes: 2400 },
  { day: "Tue", reads: 5100, writes: 2800 },
  { day: "Wed", reads: 4800, writes: 3100 },
  { day: "Thu", reads: 6300, writes: 3600 },
  { day: "Fri", reads: 7100, writes: 4200 },
  { day: "Sat", reads: 5600, writes: 3000 },
  { day: "Sun", reads: 6800, writes: 3900 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass bg-[var(--color-surface)]/95 rounded-xl px-3.5 py-2.5 shadow-[var(--shadow-float)]">
      <p className="text-[11px] text-[var(--color-ink-500)] mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-[12px]">
          <span className="size-1.5 rounded-full" style={{ background: p.color }} />
          <span className="text-[var(--color-ink-300)] capitalize">{p.dataKey}</span>
          <span className="text-white font-semibold ml-auto">{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export function ActivityChart() {
  return (
    <Card className="p-0" glow="electric">
      <CardHeader>
        <div>
          <CardTitle>Network activity</CardTitle>
          <CardDescription>Reads and writes across all gateways</CardDescription>
        </div>
        <Badge>Last 7 days</Badge>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="reads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-electric-500)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--color-electric-500)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="writes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-violet-500)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-violet-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 6" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: "#7d8296", fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "#7d8296", fontSize: 12 }} width={40} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
              <Area type="monotone" dataKey="reads" stroke="var(--color-electric-400)" strokeWidth={2.5} fill="url(#reads)" />
              <Area type="monotone" dataKey="writes" stroke="var(--color-violet-400)" strokeWidth={2.5} fill="url(#writes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
