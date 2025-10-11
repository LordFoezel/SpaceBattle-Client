import { forwardRef } from "react";
import { Textarea  } from "@chakra-ui/react";
import colors from "../../../theme/colors.js";

const BaseTextarea = forwardRef(function BaseTextarea({
  name, // for forms
  value,
  defaultValue = '',
  variant = 'outline', // outline, subtle, flushed
  size = 'md', // xs, sm, md, lg
  isDisabled = false,
  inputMode = 'text', // text, numeric, decimal, email, tel, url, search
  placeholder = '',
  autoComplete = 'off', // on, off, email, username, current-password, new-password, name, tel
  resize = "none", // none, vertical, horizontal, both
  onChange, // on input
  onBlur, // on leave
  onFocus, // on enter
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
      type="text"
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
