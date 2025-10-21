import { forwardRef, type ChangeEventHandler, type FocusEventHandler } from "react";
import { Textarea } from "@chakra-ui/react";
import colors from "../../../theme/colors.js";

interface BaseTextareaProps {
  name?: string;
  value?: any;
  defaultValue?: string;
  variant?: 'outline' | 'subtle' | 'flushed';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url' | 'search';
  placeholder?: string;
  autoComplete?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
}

const BaseTextarea = forwardRef<HTMLTextAreaElement, BaseTextareaProps>(function BaseTextarea({
  name,
  value,
  defaultValue = '',
  variant = 'outline',
  size = 'md',
  isDisabled = false,
  inputMode = 'text',
  placeholder = '',
  autoComplete = 'off',
  resize = "none",
  onChange,
  onBlur,
  onFocus,
}, ref) {
  return (
    <Textarea
      ref={ref}
      name={name}
      value={value}
      defaultValue={defaultValue}
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      inputMode={inputMode}
      placeholder={placeholder}
      autoComplete={autoComplete}
      resize={resize}
      bg={colors.surface}
      className={name}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
});

export { BaseTextarea };

