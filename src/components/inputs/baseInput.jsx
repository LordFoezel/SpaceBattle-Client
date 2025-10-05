import { forwardRef } from "react";
import { cn } from "../../helper/classNames.js";

const BaseInput = forwardRef(function BaseInput({
  label,
  name,
  hint,
  className,
  inputClassName,
  ...props
}, ref) {
  return (
    <label className={cn("space-y-2", className)}>
      {label ? (
        <span className="block text-sm font-medium text-slate-200">{label}</span>
      ) : null}
      <input
        ref={ref}
        name={name}
        className={cn(
          "w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40",
          inputClassName
        )}
        {...props}
      />
      {hint ? (
        <span className="block text-xs text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
});

export default BaseInput;
