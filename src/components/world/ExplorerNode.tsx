import { Handle, Position, type NodeProps } from "reactflow";
import { motion } from "framer-motion";
import { Globe2, Building2, Radio, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";

export interface ExplorerNodeData {
  label: string;
  sublabel?: string;
  kind: "hub" | "world" | "institution" | "gateway";
  color?: string;
  status?: string;
  expandable?: boolean;
  expanded?: boolean;
  onToggle?: () => void;
}

const iconMap = { hub: Sparkles, world: Globe2, institution: Building2, gateway: Radio };

export function ExplorerNode({ data, selected }: NodeProps<ExplorerNodeData>) {
  const Icon = iconMap[data.kind];
  const isHub = data.kind === "hub";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onClick={data.onToggle}
      className={cn(
        "relative rounded-2xl glass px-4 py-3 flex items-center gap-3 min-w-[180px] cursor-pointer transition-all duration-200",
        selected ? "border-[var(--color-electric-500)] shadow-[var(--shadow-glow-electric)]" : "border-white/10 hover:border-white/20",
        isHub && "bg-gradient-to-br from-[var(--color-electric-500)]/20 to-[var(--color-violet-500)]/20 min-w-[200px]"
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-[var(--color-electric-500)] !border-0 !size-2" />
      <div
        className="size-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: data.color ?? "linear-gradient(135deg, var(--color-electric-500), var(--color-violet-500))" }}
      >
        <Icon className="size-4 text-white" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-white truncate">{data.label}</p>
        {data.sublabel && <p className="text-[11px] text-[var(--color-ink-500)] truncate">{data.sublabel}</p>}
      </div>
      {data.status && (
        <span
          className={cn(
            "absolute -top-1.5 -right-1.5 size-3 rounded-full ring-2 ring-[var(--color-bg)]",
            data.status === "active" && "bg-emerald-400",
            data.status === "degraded" && "bg-amber-400",
            data.status === "offline" && "bg-rose-400",
            data.status === "pending" && "bg-amber-400"
          )}
        />
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-[var(--color-electric-500)] !border-0 !size-2" />
    </motion.div>
  );
}
