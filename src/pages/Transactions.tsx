import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowDownLeft, ArrowUpRight, Share2, RotateCcw, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { DataTable, type Column } from "@/components/ui/Table";
import { transactions } from "@/data/generators";
import { formatRelativeTime, formatCurrency } from "@/utils/format";
import type { Transaction } from "@/types";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";

const typeIcon = { read: ArrowDownLeft, write: ArrowUpRight, share: Share2, revoke: RotateCcw, sync: RefreshCw };

const volumeByDay = Array.from({ length: 10 }).map((_, i) => ({ d: `D${i + 1}`, v: 30 + Math.round(Math.random() * 70) }));

export default function Transactions() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Transaction | null>(null);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return transactions.filter(
      (t) =>
        (typeFilter === "all" || t.type === typeFilter) &&
        (t.agent.toLowerCase().includes(query.toLowerCase()) || t.world.toLowerCase().includes(query.toLowerCase()) || t.id.includes(query))
    );
  }, [query, typeFilter]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const columns: Column<Transaction>[] = [
    {
      key: "id",
      header: "Transaction",
      render: (t) => {
        const Icon = typeIcon[t.type];
        return (
          <div className="flex items-center gap-2.5">
            <Icon className="size-3.5 text-[var(--color-electric-400)]" />
            <span className="mono text-[12px] text-[var(--color-ink-300)]">{t.id}</span>
          </div>
        );
      },
    },
    { key: "agent", header: "Agent", render: (t) => <span className="text-white font-medium">{t.agent}</span> },
    { key: "world", header: "World", render: (t) => t.world },
    { key: "gateway", header: "Gateway", render: (t) => <span className="text-[var(--color-ink-500)]">{t.gateway}</span> },
    { key: "amount", header: "Amount", align: "right", render: (t) => (t.amount ? formatCurrency(t.amount) : "\u2014") },
    { key: "status", header: "Status", render: (t) => <StatusBadge status={t.status} /> },
    { key: "timestamp", header: "Time", align: "right", render: (t) => <span className="text-[var(--color-ink-500)]">{formatRelativeTime(t.timestamp)}</span> },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold text-white tracking-tight">Transactions</h1>
          <p className="text-[13px] text-[var(--color-ink-500)] mt-1">{filtered.length} records across the network</p>
        </div>
        <Button variant="secondary" size="sm" icon={<Download className="size-3.5" />}>Export CSV</Button>
      </motion.div>

      <Card className="p-0 mb-5">
        <CardHeader>
          <div>
            <CardTitle>Transaction volume</CardTitle>
            <CardDescription>Requests processed, last 10 days</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeByDay}>
                <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fill: "#7d8296", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#12141c", border: "1px solid #23262f", borderRadius: 12, fontSize: 12 }} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="var(--color-electric-500)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Search by agent, world, or transaction ID..." className="sm:max-w-sm" />
        <div className="flex items-center gap-2 overflow-x-auto">
          {["all", "read", "write", "share", "revoke", "sync"].map((t) => (
            <button
              key={t}
              onClick={() => { setTypeFilter(t); setPage(1); }}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium capitalize transition-colors ${
                typeFilter === t ? "border-[var(--color-electric-500)] bg-[var(--color-electric-500)]/15 text-white" : "border-[var(--color-border)] text-[var(--color-ink-500)] hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <Card className="p-0">
        <DataTable columns={columns} data={paged} onRowClick={setSelected} />
        <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--color-border-soft)]">
          <p className="text-[12px] text-[var(--color-ink-500)]">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" icon={<ChevronLeft className="size-3.5" />} disabled={page === 1} onClick={() => setPage((p) => p - 1)} />
            <Button variant="secondary" size="sm" icon={<ChevronRight className="size-3.5" />} disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} />
          </div>
        </div>
      </Card>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.id} subtitle="Transaction detail">
        {selected && (
          <div className="space-y-5">
            <StatusBadge status={selected.status} />
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Type", value: selected.type },
                { label: "Agent", value: selected.agent },
                { label: "World", value: selected.world },
                { label: "Gateway used", value: selected.gateway },
              ].map((f) => (
                <div key={f.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-3.5">
                  <p className="text-[10.5px] uppercase tracking-wide text-[var(--color-ink-500)] mb-1">{f.label}</p>
                  <p className="text-[13px] text-white font-medium capitalize truncate">{f.value}</p>
                </div>
              ))}
            </div>
            {selected.amount && (
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 flex items-center justify-between">
                <span className="text-[13px] text-[var(--color-ink-300)]">Amount</span>
                <span className="text-[18px] font-semibold text-white">{formatCurrency(selected.amount)}</span>
              </div>
            )}
            <div>
              <p className="text-[12px] font-semibold text-[var(--color-ink-300)] uppercase tracking-wide mb-2.5">Consent reference</p>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-3.5 text-[12.5px] text-[var(--color-ink-300)]">
                Linked to consent grant <span className="mono text-white">cn-{3000 + (selected.id.length % 24)}</span>, verified at gateway ingress.
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
