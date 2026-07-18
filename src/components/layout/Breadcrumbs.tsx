import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Fragment } from "react";

const labelMap: Record<string, string> = {
  worlds: "World Explorer",
  agents: "Agents",
  lockers: "Lockers",
  gateways: "Gateways",
  consent: "Consent",
  transactions: "Transactions",
  settings: "Settings",
};

export function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return (
      <div className="flex items-center gap-1.5 text-[13px] text-[var(--color-ink-300)]">
        <Home className="size-3.5" />
        <span className="text-white font-medium">Dashboard</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-[13px] text-[var(--color-ink-500)]">
      <Link to="/" className="hover:text-white transition-colors flex items-center">
        <Home className="size-3.5" />
      </Link>
      {parts.map((part, i) => {
        const path = "/" + parts.slice(0, i + 1).join("/");
        const isLast = i === parts.length - 1;
        const label = labelMap[part] ?? decodeURIComponent(part);
        return (
          <Fragment key={path}>
            <ChevronRight className="size-3.5 text-[var(--color-ink-700)]" />
            {isLast ? (
              <span className="text-white font-medium">{label}</span>
            ) : (
              <Link to={path} className="hover:text-white transition-colors">
                {label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
