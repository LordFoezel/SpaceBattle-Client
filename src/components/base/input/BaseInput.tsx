import { forwardRef, type ChangeEventHandler, type FocusEventHandler, type KeyboardEventHandler } from "react";
import { Input } from "@chakra-ui/react";
import colors from "../../../theme/colors.js";

type InputMode = 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url' | 'search';
type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

interface BaseInputProps {
  name?: string;
  value?: any;
  defaultValue?: string;
  variant?: 'outline' | 'subtle' | 'flushed';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  inputMode?: InputMode;
  placeholder?: string;
  autoComplete?: string;
  type?: InputType;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  [key: string]: any;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(function BaseInput(props, ref) {
  const {
    name,
    value,
    defaultValue = '',
    variant = 'outline',
    size = 'md',
    isDisabled = false,
    inputMode = 'text',
    placeholder = '',
    autoComplete = 'off',
    type = 'text',
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    ...rest
  } = props;

  const isControlled = typeof value !== 'undefined';

  return (
    <Input
      ref={ref}
      name={name}
      {...(isControlled ? { value } : { defaultValue })}
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      inputMode={inputMode}
      placeholder={placeholder}
      autoComplete={autoComplete}
      type={type}
      {...rest}
      bg={colors.surface}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    />
  );
});

export { BaseInput };

