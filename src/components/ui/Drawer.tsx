import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = "440px",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
}) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            style={{ width }}
            className={cn(
              "absolute right-0 top-0 h-full max-w-[92vw] glass bg-[var(--color-surface)] shadow-[var(--shadow-float)] border-l border-[var(--color-border)] flex flex-col"
            )}
          >
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[var(--color-border-soft)]">
              <div>
                {title && <h2 className="text-[16px] font-semibold text-white">{title}</h2>}
                {subtitle && <p className="text-[13px] text-[var(--color-ink-500)] mt-1">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                aria-label="Close panel"
                className="rounded-lg p-1.5 text-[var(--color-ink-500)] hover:bg-white/5 hover:text-white transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
