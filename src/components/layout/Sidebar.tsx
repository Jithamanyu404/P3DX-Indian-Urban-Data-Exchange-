import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Globe2,
  Users,
  Lock,
  Radio,
  ShieldCheck,
  ArrowLeftRight,
  Sparkles,
  Settings,
  ChevronsLeft,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useState } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/worlds", label: "World Explorer", icon: Globe2 },
  { to: "/agents", label: "Agents", icon: Users },
  { to: "/lockers", label: "Lockers", icon: Lock },
  { to: "/gateways", label: "Gateways", icon: Radio },
  { to: "/consent", label: "Consent", icon: ShieldCheck },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 248 }}
      transition={{ type: "spring", stiffness: 320, damping: 34 }}
      className="hidden lg:flex flex-col h-screen sticky top-0 shrink-0 border-r border-[var(--color-border-soft)] bg-[var(--color-bg-elevated)]/80 backdrop-blur-xl"
    >
      <div className={cn("flex items-center gap-2.5 px-5 h-16 shrink-0", collapsed && "px-4 justify-center")}>
        <div className="relative shrink-0">
          <div className="absolute inset-0 blur-md bg-[var(--color-electric-500)]/50 rounded-lg" />
          <div className="relative size-8 rounded-lg bg-gradient-to-br from-[var(--color-electric-400)] to-[var(--color-violet-500)] flex items-center justify-center">
            <Sparkles className="size-4 text-white" strokeWidth={2.25} />
          </div>
        </div>
        {!collapsed && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-semibold tracking-tight text-white text-[15px]">
            Meridian
          </motion.span>
        )}
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 rounded-[10px] px-3 h-10 text-[13.5px] font-medium transition-colors",
                collapsed && "justify-center px-0",
                isActive
                  ? "text-white"
                  : "text-[var(--color-ink-500)] hover:text-white hover:bg-white/[0.04]"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-[var(--color-electric-500)]/15 to-[var(--color-violet-500)]/10 border border-[var(--color-electric-500)]/25"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <item.icon className={cn("size-[18px] shrink-0 relative z-10", isActive && "text-[var(--color-electric-400)]")} strokeWidth={1.9} />
                {!collapsed && <span className="relative z-10 truncate">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-3 space-y-0.5">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-[10px] px-3 h-10 text-[13.5px] font-medium transition-colors",
              collapsed && "justify-center px-0",
              isActive ? "text-white bg-white/[0.04]" : "text-[var(--color-ink-500)] hover:text-white hover:bg-white/[0.04]"
            )
          }
        >
          <Settings className="size-[18px] shrink-0" strokeWidth={1.9} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            "w-full flex items-center gap-3 rounded-[10px] px-3 h-10 text-[13.5px] font-medium text-[var(--color-ink-500)] hover:text-white hover:bg-white/[0.04] transition-colors",
            collapsed && "justify-center px-0"
          )}
        >
          <ChevronsLeft className={cn("size-[18px] transition-transform", collapsed && "rotate-180")} strokeWidth={1.9} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
}
