import { forwardRef } from "react";
import { Input } from "@chakra-ui/react";
import { cn } from "../../helper/classNames.js";

const BaseInput = forwardRef(function BaseInput({
  name, // for forms
  value,
  variant = 'outline', // outline, subtle, flushed
  size = 'md', // xs, sm, md, lg
  isDisabled = false,
  inputMode = 'text', // text, numeric, decimal, email, tel, url, search
  placeholder = '',
  autoComplete = 'off', // on, off, email, username, current-password, new-password, name, tel
  type = 'text', // text, email, password, number, tel, url
  onBlur, // on leave
  onFocus, // on enter
}, ref) {

  const className = "w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40";
  
  return (
    <Input
      ref={ref}
      name={name}
      value={value}
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      inputMode={inputMode}
      placeholder={placeholder}
      autoComplete={autoComplete}
      type={type}
      bg="#0f172a"
      className={cn(className)}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
});

export { BaseInput };
