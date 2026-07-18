import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-gradient-to-b from-[var(--color-electric-400)] to-[var(--color-electric-600)] text-white shadow-[var(--shadow-glow-electric)] hover:brightness-110",
  secondary:
    "bg-[var(--color-surface-2)] text-[var(--color-ink-100)] border border-[var(--color-border)] hover:bg-[#1d2029] hover:border-[#2c3040]",
  ghost:
    "bg-transparent text-[var(--color-ink-300)] hover:bg-white/5 hover:text-white",
  danger:
    "bg-gradient-to-b from-rose-400 to-rose-600 text-white shadow-[0_8px_24px_-8px_rgba(244,63,94,0.5)] hover:brightness-110",
  outline:
    "bg-transparent border border-[var(--color-border)] text-[var(--color-ink-100)] hover:border-[var(--color-electric-500)] hover:text-white",
};

const sizes = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
  icon: "h-10 w-10 p-0 justify-center",
};

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, icon, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center rounded-[var(--radius-control)] font-medium transition-colors duration-150",
          "disabled:opacity-50 disabled:pointer-events-none select-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? <Loader2 className="size-4 animate-spin" /> : icon}
        {children as React.ReactNode}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
