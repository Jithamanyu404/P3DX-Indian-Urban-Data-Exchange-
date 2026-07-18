import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  Search,
  LayoutGrid,
  Globe2,
  Users,
  Lock,
  Radio,
  ShieldCheck,
  ArrowLeftRight,
  CornerDownLeft,
  Clock,
} from "lucide-react";
import { useCommandPalette } from "@/context/CommandPaletteContext";
import { worlds } from "@/data/worlds";
import { agents, transactions } from "@/data/generators";
import { cn } from "@/utils/cn";

interface Item {
  id: string;
  group: string;
  label: string;
  sublabel?: string;
  icon: React.ElementType;
  action: () => void;
}

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("meridian:recent-searches") ?? "[]");
    } catch {
      return [];
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const pageItems: Item[] = useMemo(
    () => [
      { id: "p-dash", group: "Pages", label: "Dashboard", icon: LayoutGrid, action: () => navigate("/") },
      { id: "p-worlds", group: "Pages", label: "World Explorer", icon: Globe2, action: () => navigate("/worlds") },
      { id: "p-agents", group: "Pages", label: "Agents", icon: Users, action: () => navigate("/agents") },
      { id: "p-lockers", group: "Pages", label: "Lockers", icon: Lock, action: () => navigate("/lockers") },
      { id: "p-gateways", group: "Pages", label: "Gateways", icon: Radio, action: () => navigate("/gateways") },
      { id: "p-consent", group: "Pages", label: "Consent", icon: ShieldCheck, action: () => navigate("/consent") },
      { id: "p-tx", group: "Pages", label: "Transactions", icon: ArrowLeftRight, action: () => navigate("/transactions") },
    ],
    [navigate]
  );

  const worldItems: Item[] = useMemo(
    () =>
      worlds.map((w) => ({
        id: `w-${w.id}`,
        group: "Worlds",
        label: w.name,
        sublabel: w.jurisdiction,
        icon: Globe2,
        action: () => navigate(`/worlds/${w.id}`),
      })),
    [navigate]
  );

  const agentItems: Item[] = useMemo(
    () =>
      agents.slice(0, 8).map((a) => ({
        id: `a-${a.id}`,
        group: "Agents",
        label: a.name,
        sublabel: `${a.role} \u00b7 ${a.institution}`,
        icon: Users,
        action: () => navigate(`/agents`),
      })),
    [navigate]
  );

  const txItems: Item[] = useMemo(
    () =>
      transactions.slice(0, 6).map((t) => ({
        id: `t-${t.id}`,
        group: "Transactions",
        label: `${t.id} \u00b7 ${t.type}`,
        sublabel: `${t.agent} \u2014 ${t.world}`,
        icon: ArrowLeftRight,
        action: () => navigate(`/transactions`),
      })),
    [navigate]
  );

  const allItems = [...pageItems, ...worldItems, ...agentItems, ...txItems];

  const filtered = useMemo(() => {
    if (!query.trim()) return pageItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) => item.label.toLowerCase().includes(q) || item.sublabel?.toLowerCase().includes(q)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function commit(item: Item) {
    item.action();
    if (query.trim()) {
      const next = [query, ...recent.filter((r) => r !== query)].slice(0, 5);
      setRecent(next);
      localStorage.setItem("meridian:recent-searches", JSON.stringify(next));
    }
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) commit(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const grouped = filtered.reduce<Record<string, Item[]>>((acc, item) => {
    acc[item.group] = acc[item.group] ?? [];
    acc[item.group].push(item);
    return acc;
  }, {});

  let flatIndex = -1;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[14vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative w-full max-w-xl glass bg-[var(--color-surface)]/95 rounded-[var(--radius-card)] shadow-[var(--shadow-float)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 h-14 border-b border-[var(--color-border-soft)]">
              <Search className="size-4 text-[var(--color-ink-500)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Search worlds, agents, transactions, pages..."
                className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-[var(--color-ink-500)]"
              />
              <kbd className="text-[10px] font-mono text-[var(--color-ink-500)] border border-[var(--color-border)] rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto py-2">
              {!query.trim() && recent.length > 0 && (
                <div className="px-3 pb-2">
                  <p className="px-2 py-1.5 text-[11px] uppercase tracking-wide text-[var(--color-ink-500)] font-semibold">Recent</p>
                  {recent.map((r) => (
                    <button
                      key={r}
                      onClick={() => setQuery(r)}
                      className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-[var(--color-ink-300)] hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Clock className="size-3.5 text-[var(--color-ink-500)]" />
                      {r}
                    </button>
                  ))}
                </div>
              )}

              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className="px-3 pb-2">
                  <p className="px-2 py-1.5 text-[11px] uppercase tracking-wide text-[var(--color-ink-500)] font-semibold">{group}</p>
                  {items.map((item) => {
                    flatIndex += 1;
                    const isActive = flatIndex === activeIndex;
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setActiveIndex(flatIndex)}
                        onClick={() => commit(item)}
                        className={cn(
                          "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                          isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
                        )}
                      >
                        <item.icon className="size-4 text-[var(--color-ink-300)] shrink-0" />
                        <span className="flex-1 min-w-0">
                          <span className="block text-[13.5px] text-white truncate">{item.label}</span>
                          {item.sublabel && (
                            <span className="block text-[11.5px] text-[var(--color-ink-500)] truncate">{item.sublabel}</span>
                          )}
                        </span>
                        {isActive && <CornerDownLeft className="size-3.5 text-[var(--color-ink-500)] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="py-10 text-center text-[13px] text-[var(--color-ink-500)]">No results for "{query}"</div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
