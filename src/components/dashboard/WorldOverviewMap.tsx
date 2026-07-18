import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { worlds } from "@/data/worlds";
import { Link } from "react-router-dom";

// simple equirectangular projection for the abstract world map
function project(lat: number, lng: number, w: number, h: number) {
  const x = ((lng + 180) / 360) * w;
  const y = ((90 - lat) / 180) * h;
  return { x, y };
}

export function WorldOverviewMap() {
  const W = 600;
  const H = 300;

  return (
    <Card className="p-0" glow="violet">
      <CardHeader>
        <div>
          <CardTitle>World overview</CardTitle>
          <CardDescription>Live status across {worlds.length} active jurisdictions</CardDescription>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[var(--color-ink-500)]">
          <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-400" />Active</span>
          <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-amber-400" />Degraded</span>
          <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-rose-400" />Offline</span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="relative w-full rounded-2xl overflow-hidden bg-[var(--color-bg)]/60 border border-[var(--color-border-soft)]" style={{ aspectRatio: `${W}/${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full">
            {/* dotted world texture */}
            {Array.from({ length: 30 }).map((_, row) =>
              Array.from({ length: 60 }).map((_, col) => (
                <circle key={`${row}-${col}`} cx={col * 10 + 5} cy={row * 10 + 5} r={0.7} fill="rgba(255,255,255,0.06)" />
              ))
            )}

            {worlds.map((world, i) => {
              const { x, y } = project(world.lat, world.lng, W, H);
              const color = world.status === "offline" ? "#fb7185" : world.status === "degraded" ? "#fbbf24" : "#34d399";
              return (
                <g key={world.id}>
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={14}
                    fill={color}
                    opacity={0.12}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.6, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
                  />
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={4}
                    fill={color}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.08 + 0.2, type: "spring" }}
                  />
                </g>
              );
            })}
          </svg>

          {worlds.map((world, i) => {
            const { x, y } = project(world.lat, world.lng, W, H);
            return (
              <Link
                to={`/worlds/${world.id}`}
                key={world.id}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 + 0.4 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap glass bg-[var(--color-surface)] rounded-lg px-2.5 py-1.5 text-[11px] text-white shadow-[var(--shadow-float)] pointer-events-none"
                >
                  <span className="font-semibold">{world.name}</span>
                  <span className="text-[var(--color-ink-500)] ml-1">{world.uptime}% uptime</span>
                </motion.div>
                <div className="size-6 -m-3" />
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
