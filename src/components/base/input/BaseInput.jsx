import { forwardRef } from "react";
import { Input } from "@chakra-ui/react";
import colors from "../../../theme/colors.js";

const BaseInput = forwardRef(function BaseInput({
  name, // for forms
  value,
  defaultValue = '',
  variant = 'outline', // outline, subtle, flushed
  size = 'md', // xs, sm, md, lg
  isDisabled = false,
  inputMode = 'text', // text, numeric, decimal, email, tel, url, search
  placeholder = '',
  autoComplete = 'off', // on, off, email, username, current-password, new-password, name, tel
  type = 'text', // text, email, password, number, tel, url
  onChange, // on input
  onBlur, // on leave
  onFocus, // on enter
}, ref) {

  return (
    <Input
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
      type={type}
      bg={colors.surface}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
});

export { BaseInput };
