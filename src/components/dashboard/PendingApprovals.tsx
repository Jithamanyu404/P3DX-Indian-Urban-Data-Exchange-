import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { consentRecords } from "@/data/generators";
import { useState } from "react";
import { cn } from "@/utils/cn";

export function PendingApprovals() {
  const [resolved, setResolved] = useState<Record<string, "approved" | "rejected">>({});
  const pending = consentRecords.filter((c) => c.status === "pending" || c.status === "requested").slice(0, 5);

  return (
    <Card className="p-0">
      <CardHeader>
        <div>
          <CardTitle>Pending approvals</CardTitle>
          <CardDescription>Consent requests awaiting your decision</CardDescription>
        </div>
        <span className="text-[12px] font-semibold text-amber-400 bg-amber-500/10 rounded-full px-2.5 py-1">
          {pending.filter((p) => !resolved[p.id]).length} pending
        </span>
      </CardHeader>
      <CardContent className="pt-2 space-y-1.5">
        {pending.map((req) => {
          const state = resolved[req.id];
          return (
            <motion.div
              key={req.id}
              animate={{ opacity: state ? 0.45 : 1 }}
              className="flex items-center gap-3 py-2.5 px-2 rounded-xl hover:bg-white/[0.03] transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-white truncate">{req.purpose}</p>
                <p className="text-[11.5px] text-[var(--color-ink-500)] truncate">
                  {req.requester} requests {req.duration.toLowerCase()} access
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  disabled={!!state}
                  onClick={() => setResolved((r) => ({ ...r, [req.id]: "rejected" }))}
                  className={cn(
                    "size-7 rounded-lg flex items-center justify-center transition-colors",
                    state === "rejected" ? "bg-rose-500/20 text-rose-400" : "text-[var(--color-ink-500)] hover:bg-rose-500/10 hover:text-rose-400"
                  )}
                  aria-label="Reject"
                >
                  <X className="size-3.5" />
                </button>
                <button
                  disabled={!!state}
                  onClick={() => setResolved((r) => ({ ...r, [req.id]: "approved" }))}
                  className={cn(
                    "size-7 rounded-lg flex items-center justify-center transition-colors",
                    state === "approved" ? "bg-emerald-500/20 text-emerald-400" : "text-[var(--color-ink-500)] hover:bg-emerald-500/10 hover:text-emerald-400"
                  )}
                  aria-label="Approve"
                >
                  <Check className="size-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
