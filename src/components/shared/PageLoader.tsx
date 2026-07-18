import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="size-8 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-electric-400)]"
      />
    </div>
  );
}
