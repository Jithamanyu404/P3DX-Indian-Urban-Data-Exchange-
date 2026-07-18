import { NavLink } from "react-router-dom";
import { LayoutGrid, Globe2, Users, Lock, ArrowLeftRight } from "lucide-react";
import { cn } from "@/utils/cn";

const items = [
  { to: "/", label: "Home", icon: LayoutGrid, end: true },
  { to: "/worlds", label: "Worlds", icon: Globe2 },
  { to: "/agents", label: "Agents", icon: Users },
  { to: "/lockers", label: "Lockers", icon: Lock },
  { to: "/transactions", label: "Activity", icon: ArrowLeftRight },
];

export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-around h-16 px-2 border-t border-[var(--color-border-soft)] bg-[var(--color-bg-elevated)]/90 backdrop-blur-xl">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-1 flex-1 h-full text-[10px] font-medium transition-colors",
              isActive ? "text-[var(--color-electric-400)]" : "text-[var(--color-ink-500)]"
            )
          }
        >
          <item.icon className="size-5" strokeWidth={1.9} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
