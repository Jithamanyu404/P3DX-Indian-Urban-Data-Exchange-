import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import Dashboard from "@/pages/Dashboard";
import WorldDetail from "@/pages/WorldDetail";
import Agents from "@/pages/Agents";
import Lockers from "@/pages/Lockers";
import Gateways from "@/pages/Gateways";
import Consent from "@/pages/Consent";
import Transactions from "@/pages/Transactions";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import { PageLoader } from "@/components/shared/PageLoader";

// React Flow is heavy — split it into its own chunk, only loaded when visiting the explorer
const WorldExplorer = lazy(() => import("@/pages/WorldExplorer"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/worlds"
            element={
              <Suspense fallback={<PageLoader />}>
                <WorldExplorer />
              </Suspense>
            }
          />
          <Route path="/worlds/:id" element={<WorldDetail />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/lockers" element={<Lockers />} />
          <Route path="/gateways" element={<Gateways />} />
          <Route path="/consent" element={<Consent />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
