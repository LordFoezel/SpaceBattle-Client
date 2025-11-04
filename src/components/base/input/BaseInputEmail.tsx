import { forwardRef, type ChangeEventHandler, type FocusEventHandler } from "react";
import { BaseInput } from "./BaseInput";

interface BaseInputEmailProps {
  value?: any;
  defaultValue?: string;
  variant?: 'outline' | 'subtle' | 'flushed';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

const BaseInputEmail = forwardRef<HTMLInputElement, BaseInputEmailProps>(function BaseInputEmail({
  value,
  defaultValue = '',
  variant = 'outline',
  size = 'md',
  isDisabled = false,
  placeholder = '',
  onChange,
  onBlur,
  onFocus,
}, ref) {
  return (
    <BaseInput
      ref={ref}
      name="email"
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


