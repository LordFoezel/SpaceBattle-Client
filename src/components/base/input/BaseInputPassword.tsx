import { forwardRef, useState, type ChangeEventHandler, type FocusEventHandler } from "react";
import { InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { BaseInput } from "./BaseInput";

interface BaseInputPasswordProps {
  name?: string;
  value?: any;
  defaultValue?: string;
  variant?: 'outline' | 'subtle' | 'flushed';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  placeholder?: string;
  autoComplete?: 'current-password' | 'new-password';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

const BaseInputPassword = forwardRef<HTMLInputElement, BaseInputPasswordProps>(function BaseInputPassword({
  name,
  value,
  defaultValue = '',
  variant = 'outline',
  size = 'md',
  isDisabled = false,
  placeholder = '',
  autoComplete = 'current-password',
  onChange,
  onBlur,
  onFocus,
}, ref) {
  const [show, setShow] = useState(false);

  return (
    <InputGroup size={size}>
      <BaseInput
        ref={ref}
        name={name}
        value={value}
        defaultValue={defaultValue}
        variant={variant}
        size={size}
        isDisabled={isDisabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        type={show ? "text" : "password"}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <InputRightElement pr={2} pointerEvents="auto" height="100%">
        <IconButton
          aria-label={show ? "Passwort verbergen" : "Passwort anzeigen"}
          variant="ghost"
          size={size}
          isDisabled={isDisabled}
          color="var(--chakra-colors-chakra-border-color)"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShow((v) => !v)}
          icon={
            show ? (
              // Eye-off icon (simple inline SVG)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1.25em"
                height="1.25em"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12c2.6-4.1 6.7-6.1 10-6.1S19.4 7.9 22 12c-2.6 4.1-6.7 6.1-10 6.1S4.6 16.1 2 12z" />
                <circle cx="12" cy="12" r="3" />
                <line x1="3" y1="3" x2="21" y2="21" />
              </svg>
            ) : (
              // Eye icon (simple inline SVG)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="1.25em"
                height="1.25em"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12c2.6-4.1 6.7-6.1 10-6.1S19.4 7.9 22 12c-2.6 4.1-6.7 6.1-10 6.1S4.6 16.1 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )
          }
        />
      </InputRightElement>
    </InputGroup>
  );
});

export { BaseInputPassword };


