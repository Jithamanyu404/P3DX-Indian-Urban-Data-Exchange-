import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, Lock, MapPin, Building2, Users } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { agents } from "@/data/generators";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { formatRelativeTime } from "@/utils/format";
import type { Agent } from "@/types";

type SortKey = "name" | "lockerCount" | "lastActive";

export default function Agents() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("name");
  const [selected, setSelected] = useState<Agent | null>(null);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let list = agents.filter(
      (a) =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.institution.toLowerCase().includes(query.toLowerCase()) ||
        a.world.toLowerCase().includes(query.toLowerCase())
    );
    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "lockerCount") return b.lockerCount - a.lockerCount;
      return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
    });
    return list;
  }, [query, sort]);

  const { visible, sentinelRef, hasMore } = useInfiniteScroll(filtered, 12);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-white tracking-tight">Agents</h1>
          <p className="text-[13px] text-[var(--color-ink-500)] mt-1">{filtered.length} agents across every world and institution</p>
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <SearchBar value={query} onChange={setQuery} placeholder="Search agents, institutions, worlds..." className="sm:max-w-xs" shortcut="/" />
        <div className="flex items-center gap-2">
          <ArrowUpDown className="size-3.5 text-[var(--color-ink-500)]" />
          {(["name", "lockerCount", "lastActive"] as SortKey[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors capitalize ${
                sort === s ? "border-[var(--color-electric-500)] bg-[var(--color-electric-500)]/15 text-white" : "border-[var(--color-border)] text-[var(--color-ink-500)] hover:text-white"
              }`}
            >
              {s === "lockerCount" ? "Lockers" : s === "lastActive" ? "Recent" : "Name"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Users} title="No agents found" description="Try a different search term or clear your filters." />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {visible.map((a, i) => (
              <Card
                key={a.id}
                interactive
                glow="electric"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 12) * 0.03 }}
                onClick={() => setSelected(a)}
                className="p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative size-11 rounded-full bg-gradient-to-br from-[var(--color-electric-400)] to-[var(--color-violet-500)] flex items-center justify-center text-[13px] font-bold text-white shrink-0">
                    {a.avatar}
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-[var(--color-surface)] ${
                        a.status === "active" ? "bg-emerald-400" : a.status === "pending" ? "bg-amber-400" : "bg-[var(--color-ink-500)]"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white truncate">{a.name}</p>
                    <p className="text-[11.5px] text-[var(--color-ink-500)] truncate">{a.role}</p>
                  </div>
                </div>
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-[12px] text-[var(--color-ink-500)]">
                    <Building2 className="size-3.5" /> {a.institution}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[var(--color-ink-500)]">
                    <MapPin className="size-3.5" /> {a.world}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[var(--color-border-soft)]">
                  <span className="flex items-center gap-1.5 text-[12px] text-[var(--color-ink-300)]">
                    <Lock className="size-3.5" /> {a.lockerCount} lockers
                  </span>
                  <StatusBadge status={a.status} />
                </div>
              </Card>
            ))}
          </div>
          {hasMore && (
            <div ref={sentinelRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
              {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          )}
        </>
      )}

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name} subtitle={selected?.role}>
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-full bg-gradient-to-br from-[var(--color-electric-400)] to-[var(--color-violet-500)] flex items-center justify-center text-[20px] font-bold text-white">
                {selected.avatar}
              </div>
              <div>
                <StatusBadge status={selected.status} />
                <p className="text-[12px] text-[var(--color-ink-500)] mt-1.5">Active {formatRelativeTime(selected.lastActive)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Institution", value: selected.institution },
                { label: "Department", value: selected.department },
                { label: "World", value: selected.world },
                { label: "Jurisdiction", value: selected.country },
              ].map((f) => (
                <div key={f.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-3.5">
                  <p className="text-[10.5px] uppercase tracking-wide text-[var(--color-ink-500)] mb-1">{f.label}</p>
                  <p className="text-[13px] text-white font-medium truncate">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 flex items-center justify-between">
              <span className="text-[13px] text-[var(--color-ink-300)]">Lockers managed</span>
              <span className="text-[18px] font-semibold text-white">{selected.lockerCount}</span>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
