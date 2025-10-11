import { forwardRef } from "react";
import { BaseInput } from "./BaseInput.jsx";

const BaseInputEmail = forwardRef(function BaseInputEmail({
  name, // for forms
  value,
  defaultValue = '',
  variant = 'outline', // outline, subtle, flushed
  size = 'md', // xs, sm, md, lg
  isDisabled = false,
  placeholder = '',
  onChange, // on input
  onBlur, // on leave
  onFocus, // on enter
}, ref) {
  return (
    <BaseInput
      ref={ref}
      name={name}
      value={value}
      defaultValue={defaultValue}
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      inputMode="email"
      placeholder={placeholder}
      autoComplete="email"
      type="email"
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
});

export { BaseInputEmail };
