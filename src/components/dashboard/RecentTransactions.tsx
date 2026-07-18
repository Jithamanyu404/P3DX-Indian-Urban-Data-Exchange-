import { ArrowDownLeft, ArrowUpRight, Share2, RotateCcw, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { transactions } from "@/data/generators";
import { formatRelativeTime } from "@/utils/format";
import { Link } from "react-router-dom";

const typeIcon = {
  read: ArrowDownLeft,
  write: ArrowUpRight,
  share: Share2,
  revoke: RotateCcw,
  sync: RefreshCw,
};

const typeColor = {
  read: "text-[var(--color-electric-400)] bg-blue-500/10",
  write: "text-violet-400 bg-violet-500/10",
  share: "text-emerald-400 bg-emerald-500/10",
  revoke: "text-rose-400 bg-rose-500/10",
  sync: "text-amber-400 bg-amber-500/10",
};

export function RecentTransactions() {
  const recent = transactions.slice(0, 6);

  return (
    <Card className="p-0">
      <CardHeader>
        <div>
          <CardTitle>Recent transactions</CardTitle>
          <CardDescription>Latest activity across all gateways</CardDescription>
        </div>
        <Link to="/transactions" className="text-[12px] font-medium text-[var(--color-electric-400)] hover:text-[var(--color-electric-300)] transition-colors">
          View all
        </Link>
      </CardHeader>
      <CardContent className="pt-2 space-y-1">
        {recent.map((tx, i) => {
          const Icon = typeIcon[tx.type];
          return (
            <div
              key={tx.id}
              className="flex items-center gap-3.5 py-2.5 px-2 rounded-xl hover:bg-white/[0.03] transition-colors animate-in"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className={`size-9 rounded-xl flex items-center justify-center shrink-0 ${typeColor[tx.type]}`}>
                <Icon className="size-4" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-white truncate">{tx.agent}</p>
                <p className="text-[11.5px] text-[var(--color-ink-500)] truncate">
                  {tx.world} &middot; {tx.gateway}
                </p>
              </div>
              <div className="text-right shrink-0">
                <StatusBadge status={tx.status} />
                <p className="text-[10.5px] text-[var(--color-ink-700)] mt-1">{formatRelativeTime(tx.timestamp)}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
