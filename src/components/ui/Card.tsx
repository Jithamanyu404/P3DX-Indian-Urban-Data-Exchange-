import { type HTMLAttributes, forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, keyof HTMLMotionProps<"div">> {
  interactive?: boolean;
  glow?: "none" | "electric" | "violet";
}

export const Card = forwardRef<HTMLDivElement, CardProps & HTMLMotionProps<"div">>(
  ({ className, interactive, glow = "none", children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass rounded-[var(--radius-card)] shadow-[var(--shadow-card)] relative overflow-hidden",
          interactive && "cursor-pointer transition-[transform,border-color,box-shadow] duration-300",
          glow === "electric" && "hover:shadow-[var(--shadow-glow-electric)]",
          glow === "violet" && "hover:shadow-[var(--shadow-glow-violet)]",
          className
        )}
        whileHover={interactive ? { y: -3, borderColor: "rgba(255,255,255,0.14)" } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-between gap-4 px-6 pt-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-[15px] font-semibold tracking-tight text-white", className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-[13px] text-[var(--color-ink-500)] mt-0.5", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-6 pb-6", className)} {...props} />;
}
