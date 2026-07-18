import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Shield, ShieldAlert, ShieldCheck, Share2, Globe2 } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { lockers } from "@/data/generators";
import { formatRelativeTime } from "@/utils/format";
import { cn } from "@/utils/cn";

const securityMeta = {
  standard: { icon: Shield, color: "text-[var(--color-ink-300)]", label: "Standard" },
  elevated: { icon: ShieldAlert, color: "text-amber-400", label: "Elevated" },
  maximum: { icon: ShieldCheck, color: "text-emerald-400", label: "Maximum" },
};

export default function Lockers() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => lockers.filter((l) => l.name.toLowerCase().includes(query.toLowerCase()) || l.owner.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h1 className="text-[22px] font-semibold text-white tracking-tight">Lockers</h1>
        <p className="text-[13px] text-[var(--color-ink-500)] mt-1">Secure storage vaults with published connection endpoints</p>
      </motion.div>

      <SearchBar value={query} onChange={setQuery} placeholder="Search lockers or owners..." className="max-w-xs mb-5" />

      {filtered.length === 0 ? (
        <EmptyState icon={Lock} title="No lockers found" description="Adjust your search to find the vault you're looking for." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.slice(0, 24).map((l, i) => {
            const pct = Math.round((l.storageUsedGb / l.storageTotalGb) * 100);
            const sec = securityMeta[l.security];
            return (
              <Card
                key={l.id}
                interactive
                glow="electric"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 12) * 0.03 }}
                className="p-5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-[var(--color-electric-500)]/20 to-[var(--color-violet-500)]/20 flex items-center justify-center">
                    <Lock className="size-4.5 text-[var(--color-electric-400)]" />
                  </div>
                  <span className={cn("flex items-center gap-1 text-[11px] font-medium", sec.color)}>
                    <sec.icon className="size-3.5" /> {sec.label}
                  </span>
                </div>

                <p className="text-[14px] font-semibold text-white truncate">{l.name}</p>
                <p className="text-[11.5px] text-[var(--color-ink-500)] mt-0.5 truncate">{l.owner} &middot; {l.world}</p>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-[var(--color-ink-500)] mb-1.5">
                    <span>{l.storageUsedGb.toFixed(1)} GB used</span>
                    <span>{l.storageTotalGb} GB</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        "h-full rounded-full",
                        pct > 85 ? "bg-gradient-to-r from-amber-400 to-rose-500" : "bg-gradient-to-r from-[var(--color-electric-500)] to-[var(--color-violet-500)]"
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-border-soft)]">
                  <div className="flex items-center gap-3 text-[11.5px] text-[var(--color-ink-500)]">
                    <span className="flex items-center gap-1"><Share2 className="size-3.5" /> {l.sharedFiles}</span>
                    {l.published && <span className="flex items-center gap-1 text-[var(--color-electric-400)]"><Globe2 className="size-3.5" /> Published</span>}
                  </div>
                  <StatusBadge status={l.consentStatus} />
                </div>
                <p className="text-[10.5px] text-[var(--color-ink-700)] mt-2">Last activity {formatRelativeTime(l.lastActivity)}</p>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
