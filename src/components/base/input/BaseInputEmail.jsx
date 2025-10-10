import { forwardRef } from "react";
import { BaseInput } from "./BaseInput.jsx";

const BaseInputEmail = forwardRef(function BaseInputEmail({
  name, // for forms
  value,
  variant = 'outline', // outline, subtle, flushed
  size = 'md', // xs, sm, md, lg
  isDisabled = false,
  placeholder = '',
  onBlur, // on leave
  onFocus, // on enter
}, ref) {
  return (
    <BaseInput
      ref={ref}
      name={name}
      value={value}
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      inputMode="email"
      placeholder={placeholder}
      autoComplete="email"
      type="email"
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
});

export { BaseInputEmail };
