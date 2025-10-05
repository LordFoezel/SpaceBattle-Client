import { forwardRef } from "react";
import { cn } from "../../helper/classNames.js";

const VARIANTS = {
  primary:
    "bg-sky-500 text-white shadow-sky-500/40 hover:bg-sky-400 focus-visible:ring-sky-300",
  secondary:
    "bg-slate-800/80 text-slate-100 hover:bg-slate-700/80 focus-visible:ring-slate-400",
  ghost:
    "bg-transparent text-slate-300 hover:bg-slate-800/50 focus-visible:ring-slate-500",
};

const SIZES = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

const BaseButton = forwardRef(function BaseButton(
  {
    as: Component = "button",
    children,
    className,
    type = "button",
    variant = "primary",
    size = "md",
    ...props
  },
  ref
) {
  const variantClasses = VARIANTS[variant] ?? VARIANTS.primary;
  const sizeClasses = SIZES[size] ?? SIZES.md;

  return (
    <Component
      ref={ref}
      type={Component === "button" ? type : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border border-transparent font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses,
        sizeClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

export default BaseButton;
