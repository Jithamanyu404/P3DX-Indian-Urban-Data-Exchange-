import { Globe2, Users, Lock, Radio } from "lucide-react";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { WorldOverviewMap } from "@/components/dashboard/WorldOverviewMap";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { PendingApprovals } from "@/components/dashboard/PendingApprovals";
import { GatewayStatus } from "@/components/dashboard/GatewayStatus";
import { LiveTimeline } from "@/components/dashboard/LiveTimeline";
import { QuickActions, ActivityHeatmap } from "@/components/dashboard/QuickActionsHeatmap";

export default function Dashboard() {
  return (
    <div>
      <WelcomeHeader />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard label="Active worlds" value={8} delta={12.5} icon={Globe2} accent="electric" index={0} />
        <StatCard label="Registered agents" value={6142} delta={4.2} icon={Users} accent="violet" index={1} />
        <StatCard label="Lockers secured" value={21822} delta={8.1} icon={Lock} accent="emerald" index={2} />
        <StatCard label="Gateway requests /24h" value={1284392} delta={-2.4} icon={Radio} accent="electric" index={3} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        <div className="xl:col-span-2">
          <ActivityChart />
        </div>
        <GatewayStatus />
      </div>

      <div className="mb-5">
        <WorldOverviewMap />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <RecentTransactions />
        <PendingApprovals />
        <LiveTimeline />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1">
          <QuickActions />
        </div>
        <div className="lg:col-span-2">
          <ActivityHeatmap />
        </div>
      </div>
    </div>
  );
}
