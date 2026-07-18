import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Check, ChevronRight, Clock, FileText, Ban } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { consentRecords } from "@/data/generators";
import type { ConsentRecord } from "@/types";
import { cn } from "@/utils/cn";

const steps = ["requested", "pending", "approved", "connected", "expired"] as const;

const stepStyles: Record<string, string> = {
  requested: "text-[var(--color-ink-500)]",
  pending: "text-amber-400",
  approved: "text-[var(--color-electric-400)]",
  connected: "text-emerald-400",
  expired: "text-[var(--color-ink-700)]",
};

function statusToStepIndex(status: ConsentRecord["status"]) {
  if (status === "rejected" || status === "revoked") return -1;
  const idx = steps.indexOf(status as (typeof steps)[number]);
  return idx === -1 ? 0 : idx;
}

function Stepper({ status }: { status: ConsentRecord["status"] }) {
  const idx = statusToStepIndex(status);
  const failed = status === "rejected" || status === "revoked";

  return (
    <div className="flex items-center">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <motion.div
              initial={false}
              animate={{
                scale: i === idx ? 1.15 : 1,
                backgroundColor: failed ? "rgba(244,63,94,0.15)" : i <= idx ? "rgba(47,123,255,0.18)" : "rgba(255,255,255,0.04)",
              }}
              className={cn(
                "size-7 rounded-full flex items-center justify-center border",
                i <= idx && !failed ? "border-[var(--color-electric-500)]/40" : "border-[var(--color-border)]"
              )}
            >
              {i < idx || (i === idx && status === "expired") ? (
                <Check className={cn("size-3.5", failed ? "text-rose-400" : "text-[var(--color-electric-400)]")} />
              ) : (
                <span className={cn("text-[10px] font-semibold", i === idx ? stepStyles[s] : "text-[var(--color-ink-700)]")}>{i + 1}</span>
              )}
            </motion.div>
            <span className={cn("text-[10px] capitalize", i === idx ? "text-white font-medium" : "text-[var(--color-ink-700)]")}>{s}</span>
          </div>
          {i < steps.length - 1 && <ChevronRight className="size-3.5 text-[var(--color-border)] mx-1 mb-4" />}
        </div>
      ))}
    </div>
  );
}

export default function Consent() {
  const [records, setRecords] = useState(consentRecords);
  const [modalRecord, setModalRecord] = useState<ConsentRecord | null>(null);
  const [action, setAction] = useState<"approve" | "reject" | "revoke" | null>(null);

  function applyAction() {
    if (!modalRecord || !action) return;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === modalRecord.id
          ? { ...r, status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "revoked" }
          : r
      )
    );
    setModalRecord(null);
    setAction(null);
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h1 className="text-[22px] font-semibold text-white tracking-tight">Consent management</h1>
        <p className="text-[13px] text-[var(--color-ink-500)] mt-1">Review, approve, and track data-sharing agreements end to end</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {records.map((r, i) => (
          <Card key={r.id} interactive glow="electric" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 8) * 0.04 }} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="size-4 text-[var(--color-electric-400)]" />
                  <p className="text-[14.5px] font-semibold text-white truncate">{r.purpose}</p>
                </div>
                <p className="text-[12.5px] text-[var(--color-ink-500)]">
                  {r.requester} requests from {r.grantor} &middot; {r.duration}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {r.permissions.map((p) => (
                    <Badge key={p}>{p}</Badge>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                {r.status === "rejected" || r.status === "revoked" ? (
                  <div className="flex items-center gap-2 text-rose-400 text-[12px] font-medium">
                    <Ban className="size-4" /> {r.status === "rejected" ? "Rejected" : "Revoked"}
                  </div>
                ) : (
                  <Stepper status={r.status} />
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {(r.status === "requested" || r.status === "pending") && (
                  <>
                    <Button size="sm" variant="secondary" onClick={() => { setModalRecord(r); setAction("reject"); }}>
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => { setModalRecord(r); setAction("approve"); }}>
                      Approve
                    </Button>
                  </>
                )}
                {(r.status === "approved" || r.status === "connected") && (
                  <Button size="sm" variant="danger" onClick={() => { setModalRecord(r); setAction("revoke"); }}>
                    Revoke
                  </Button>
                )}
                {(r.status === "rejected" || r.status === "revoked" || r.status === "expired") && (
                  <Button size="sm" variant="ghost" icon={<FileText className="size-3.5" />}>
                    View log
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={!!modalRecord}
        onClose={() => { setModalRecord(null); setAction(null); }}
        title={action === "approve" ? "Approve consent request" : action === "reject" ? "Reject consent request" : "Revoke access"}
        description={modalRecord?.purpose}
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] p-4 space-y-2">
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-[var(--color-ink-500)]">Requester</span>
              <span className="text-white font-medium">{modalRecord?.requester}</span>
            </div>
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-[var(--color-ink-500)]">Duration</span>
              <span className="text-white font-medium">{modalRecord?.duration}</span>
            </div>
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="text-[var(--color-ink-500)] flex items-center gap-1"><Clock className="size-3.5" /> Expiry</span>
              <span className="text-white font-medium">{modalRecord ? new Date(modalRecord.expiry).toLocaleDateString() : ""}</span>
            </div>
          </div>
          <p className="text-[12.5px] text-[var(--color-ink-500)] leading-relaxed">
            {action === "approve" && "This grants the requester access under the permissions listed. You can revoke at any time."}
            {action === "reject" && "This request will be closed and the requester notified. No access will be granted."}
            {action === "revoke" && "This immediately terminates active access. The requester will be notified."}
          </p>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => { setModalRecord(null); setAction(null); }}>Cancel</Button>
            <Button variant={action === "approve" ? "primary" : "danger"} onClick={applyAction}>
              Confirm {action}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
