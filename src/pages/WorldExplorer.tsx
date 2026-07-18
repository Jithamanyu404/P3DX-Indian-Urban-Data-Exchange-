import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type Node,
  type Edge,
  type NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import { Filter, Globe2, Building2, Radio, Users, Lock, ShieldCheck } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Drawer } from "@/components/ui/Drawer";
import { StatusBadge } from "@/components/ui/Badge";
import { Badge } from "@/components/ui/Badge";
import { ExplorerNode, type ExplorerNodeData } from "@/components/world/ExplorerNode";
import { worlds } from "@/data/worlds";
import type { Status } from "@/types";

const nodeTypes: NodeTypes = { explorer: ExplorerNode };

const institutionsByWorld: Record<string, { name: string; gateways: number }[]> = Object.fromEntries(
  worlds.map((w) => [
    w.id,
    Array.from({ length: Math.min(3, Math.max(2, Math.round(w.institutions / 20))) }).map((_, i) => ({
      name: `${w.name.split(" ")[0]} Institution ${i + 1}`,
      gateways: Math.max(1, Math.round(w.gateways / 2)),
    })),
  ])
);

interface SelectedInfo {
  kind: "world" | "institution" | "gateway";
  title: string;
  subtitle: string;
  status: Status;
}

export default function WorldExplorer() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<SelectedInfo | null>(null);
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filteredWorlds = useMemo(
    () =>
      worlds.filter(
        (w) =>
          (regionFilter === "all" || w.region === regionFilter) &&
          (query.trim() === "" || w.name.toLowerCase().includes(query.toLowerCase()) || w.jurisdiction.toLowerCase().includes(query.toLowerCase()))
      ),
    [query, regionFilter]
  );

  const { nodes, edges } = useMemo(() => {
    const nodes: Node<ExplorerNodeData>[] = [];
    const edges: Edge[] = [];

    const hubX = Math.max(400, filteredWorlds.length * 130);
    nodes.push({
      id: "hub",
      type: "explorer",
      position: { x: hubX, y: 0 },
      data: { label: "Meridian Network", sublabel: "Global gateway core", kind: "hub" },
      draggable: false,
    });

    filteredWorlds.forEach((world, i) => {
      const x = i * 260;
      const isExpanded = expanded.has(world.id);
      nodes.push({
        id: world.id,
        type: "explorer",
        position: { x, y: 160 },
        data: {
          label: world.name,
          sublabel: `${world.institutions} institutions`,
          kind: "world",
          status: world.status,
          onToggle: () => {
            toggleExpand(world.id);
            setSelected({ kind: "world", title: world.name, subtitle: world.jurisdiction, status: world.status });
          },
        },
      });
      edges.push({
        id: `hub-${world.id}`,
        source: "hub",
        target: world.id,
        animated: true,
        style: { stroke: world.color, strokeWidth: 1.5, opacity: 0.6 },
      });

      if (isExpanded) {
        const insts = institutionsByWorld[world.id] ?? [];
        insts.forEach((inst, j) => {
          const instId = `${world.id}-inst-${j}`;
          const instX = x + (j - (insts.length - 1) / 2) * 190;
          nodes.push({
            id: instId,
            type: "explorer",
            position: { x: instX, y: 340 },
            data: {
              label: inst.name,
              sublabel: "Institution",
              kind: "institution",
              status: "active",
              onToggle: () =>
                setSelected({ kind: "institution", title: inst.name, subtitle: `${world.name} \u00b7 ${inst.gateways} gateways`, status: "active" }),
            },
          });
          edges.push({
            id: `${world.id}-${instId}`,
            source: world.id,
            target: instId,
            animated: true,
            style: { stroke: "rgba(255,255,255,0.25)", strokeWidth: 1.3 },
          });

          const gwId = `${instId}-gw`;
          nodes.push({
            id: gwId,
            type: "explorer",
            position: { x: instX, y: 480 },
            data: {
              label: `Gateway ${j + 1}`,
              sublabel: "Connection endpoint",
              kind: "gateway",
              status: "active",
              onToggle: () => setSelected({ kind: "gateway", title: `${inst.name} Gateway`, subtitle: `${world.name} \u00b7 Active endpoint`, status: "active" }),
            },
          });
          edges.push({
            id: `${instId}-${gwId}`,
            source: instId,
            target: gwId,
            animated: true,
            style: { stroke: "rgba(255,255,255,0.18)", strokeWidth: 1.2 },
          });
        });
      }
    });

    return { nodes, edges };
  }, [filteredWorlds, expanded, toggleExpand]);

  const regions = ["all", ...Array.from(new Set(worlds.map((w) => w.region)))];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h1 className="text-[22px] font-semibold text-white tracking-tight">World Explorer</h1>
        <p className="text-[13px] text-[var(--color-ink-500)] mt-1">
          Visualize jurisdictions, institutions, and gateways across the network. Click any node to expand.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Search worlds or jurisdictions..." className="sm:max-w-xs" />
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="size-3.5 text-[var(--color-ink-500)] shrink-0" />
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegionFilter(r)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                regionFilter === r
                  ? "border-[var(--color-electric-500)] bg-[var(--color-electric-500)]/15 text-white"
                  : "border-[var(--color-border)] text-[var(--color-ink-500)] hover:text-white"
              }`}
            >
              {r === "all" ? "All regions" : r}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[var(--radius-card)] overflow-hidden border border-[var(--color-border-soft)] glass" style={{ height: "62vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodesDraggable={false}
          nodesConnectable={false}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.3}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1} color="rgba(255,255,255,0.06)" />
          <Controls className="!bg-[var(--color-surface)] !border-[var(--color-border)] !shadow-lg [&>button]:!bg-[var(--color-surface)] [&>button]:!border-[var(--color-border)] [&>button]:!text-white" />
          <MiniMap
            pannable
            zoomable
            maskColor="rgba(10,11,15,0.75)"
            nodeColor={(n) => (n.data as ExplorerNodeData)?.color ?? "#2f7bff"}
            className="!bg-[var(--color-surface)] !border !border-[var(--color-border)] !rounded-xl overflow-hidden"
          />
        </ReactFlow>
      </div>

      <p className="text-[11.5px] text-[var(--color-ink-700)] mt-3">
        Tip: click a world to reveal its institutions and gateways. Scroll to zoom, drag to pan.
      </p>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.title} subtitle={selected?.subtitle}>
        {selected && (
          <div className="space-y-6">
            <StatusBadge status={selected.status} />

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Departments", value: 6, icon: Building2 },
                { label: "Agents", value: 142, icon: Users },
                { label: "Lockers", value: 890, icon: Lock },
                { label: "Gateways", value: 3, icon: Radio },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4">
                  <s.icon className="size-4 text-[var(--color-electric-400)] mb-2" />
                  <p className="text-[18px] font-semibold text-white">{s.value}</p>
                  <p className="text-[11.5px] text-[var(--color-ink-500)]">{s.label}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[12px] font-semibold text-[var(--color-ink-300)] uppercase tracking-wide mb-2.5">Active policies</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="gap-1"><ShieldCheck className="size-3" /> Data residency enforced</Badge>
                <Badge className="gap-1"><ShieldCheck className="size-3" /> Consent required</Badge>
                <Badge className="gap-1"><Globe2 className="size-3" /> Cross-border sync</Badge>
              </div>
            </div>

            <div>
              <p className="text-[12px] font-semibold text-[var(--color-ink-300)] uppercase tracking-wide mb-2.5">Recent connections</p>
              <div className="space-y-2">
                {["Claims verification approved", "New agent onboarded", "Gateway health check passed"].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[12.5px] text-[var(--color-ink-300)]">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
