import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { CommandPaletteProvider } from "@/context/CommandPaletteContext";
import { PageTransition } from "@/animations/PageTransition";

export function AppLayout() {
  const location = useLocation();

  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen bg-[var(--color-bg)] bg-grid">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <Navbar />
          <main className="flex-1 px-5 lg:px-8 py-6 pb-24 lg:pb-8 max-w-[1600px] w-full mx-auto">
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </main>
        </div>
        <MobileNav />
        <CommandPalette />
      </div>
    </CommandPaletteProvider>
  );
}
