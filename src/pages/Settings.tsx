import { motion } from "framer-motion";
import { Settings as SettingsIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const fields = [
  { label: "Organization name", value: "Meridian Global" },
  { label: "Default region", value: "AMER" },
  { label: "Support contact", value: "ops@meridian.io" },
];

export default function Settings() {
  return (
    <div className="max-w-2xl">
      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h1 className="text-[22px] font-semibold text-white tracking-tight">Settings</h1>
        <p className="text-[13px] text-[var(--color-ink-500)] mt-1">Manage your organization and platform preferences</p>
      </motion.div>

      <Card className="p-0">
        <CardHeader>
          <div>
            <CardTitle>Organization</CardTitle>
            <CardDescription>Basic information about your Meridian workspace</CardDescription>
          </div>
          <SettingsIcon className="size-4 text-[var(--color-ink-500)]" />
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          {fields.map((f) => (
            <div key={f.label}>
              <label className="text-[12px] text-[var(--color-ink-500)] mb-1.5 block">{f.label}</label>
              <input
                defaultValue={f.value}
                className="w-full h-10 rounded-[var(--radius-control)] border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3.5 text-[13.5px] text-white outline-none focus:border-[var(--color-electric-500)] focus:ring-2 focus:ring-[var(--color-electric-500)]/20 transition-colors"
              />
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <Button size="sm">Save changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
