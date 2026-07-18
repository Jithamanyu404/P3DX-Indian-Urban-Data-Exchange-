import { Bell, Search, Command } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useCommandPalette } from "@/context/CommandPaletteContext";
import { notifications as mockNotifications } from "@/data/generators";
import { formatRelativeTime } from "@/utils/format";
import { cn } from "@/utils/cn";

const typeDot: Record<string, string> = {
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  info: "bg-[var(--color-electric-400)]",
  error: "bg-rose-400",
};

export function Navbar() {
  const { setOpen } = useCommandPalette();
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-4 h-16 px-5 lg:px-8 border-b border-[var(--color-border-soft)] bg-[var(--color-bg)]/70 backdrop-blur-xl">
      <Breadcrumbs />

      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="hidden sm:flex items-center gap-2.5 h-9 pl-3 pr-2.5 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-500)] hover:text-white hover:border-[#2c3040] transition-colors"
        >
          <Search className="size-3.5" />
          <span className="text-[13px]">Search...</span>
          <kbd className="flex items-center gap-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface-2)] px-1.5 py-0.5 text-[10px] font-mono">
            <Command className="size-2.5" />K
          </kbd>
        </button>

        <button
          onClick={() => setOpen(true)}
          aria-label="Search"
          className="sm:hidden flex items-center justify-center size-9 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-500)]"
        >
          <Search className="size-4" />
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            aria-label="Notifications"
            className="relative flex items-center justify-center size-9 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-500)] hover:text-white hover:border-[#2c3040] transition-colors"
          >
            <Bell className="size-4" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-gradient-to-b from-[var(--color-electric-400)] to-[var(--color-electric-600)] text-[9px] font-bold text-white flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute right-0 mt-2 w-80 glass bg-[var(--color-surface)]/95 rounded-2xl shadow-[var(--shadow-float)] overflow-hidden z-50"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-soft)]">
                    <p className="text-[13px] font-semibold text-white">Notifications</p>
                    <span className="text-[11px] text-[var(--color-ink-500)]">{unread} unread</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {mockNotifications.map((n) => (
                      <div key={n.id} className={cn("flex gap-3 px-4 py-3 border-b border-[var(--color-border-soft)] last:border-0", !n.read && "bg-white/[0.02]")}>
                        <span className={cn("mt-1.5 size-1.5 rounded-full shrink-0", typeDot[n.type])} />
                        <div className="min-w-0">
                          <p className="text-[12.5px] font-medium text-white truncate">{n.title}</p>
                          <p className="text-[12px] text-[var(--color-ink-500)] mt-0.5 leading-relaxed">{n.description}</p>
                          <p className="text-[11px] text-[var(--color-ink-700)] mt-1">{formatRelativeTime(n.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <button className="flex items-center justify-center size-9 rounded-full bg-gradient-to-br from-[var(--color-electric-400)] to-[var(--color-violet-500)] text-[12px] font-bold text-white shadow-[var(--shadow-glow-electric)]">
          JD
        </button>
      </div>
    </header>
  );
}
