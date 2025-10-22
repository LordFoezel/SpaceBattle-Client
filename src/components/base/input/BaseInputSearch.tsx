import { forwardRef, useRef, type ChangeEventHandler, type FocusEventHandler, type KeyboardEventHandler } from "react";
import { InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/react";
import { BaseInput } from "./BaseInput";
import { IconCross } from "../../icon/IconCross";
import { IconSearch } from "../../icon/IconSearch";

interface BaseInputSearchProps {
  name?: string;
  value?: any;
  defaultValue?: string;
  variant?: 'outline' | 'subtle' | 'flushed';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onSearch?: (query: string) => void;
}

const BaseInputSearch = forwardRef<HTMLInputElement, BaseInputSearchProps>(function BaseInputSearch({
  name,
  value,
  defaultValue = '',
  variant = 'outline',
  size = 'md',
  isDisabled = false,
  placeholder = '',
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onSearch,
}, ref) {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const setCombinedRef = (el: HTMLInputElement | null) => {
    inputRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref && typeof (ref as any) === 'object') (ref as any).current = el;
  };

  const triggerSearch = () => {
    const current = typeof value !== 'undefined' ? value : inputRef.current?.value || '';
    if (onSearch) onSearch(current);
  };

  const handleClearClick = (e) => {
    e?.preventDefault?.();
    const inputEl = inputRef.current as HTMLInputElement | undefined;
    if (inputEl) {
      inputEl.value = '';
      inputEl.focus?.();
    }

    if (onChange) {
      const target = inputEl ?? ({ value: '' } as HTMLInputElement);
      try {
        onChange({
          ...e,
          target,
          currentTarget: target,
        } as any);
      } catch {
        onChange({ target } as any);
      }
    }
  };

  return (
    <InputGroup size={size}>
      <InputRightElement pointerEvents="auto" height="100%" onClick={handleClearClick}>
        <IconCross />
      </InputRightElement>
      <InputLeftElement pointerEvents="none" height="100%">
        <IconSearch />
      </InputLeftElement>
      <BaseInput
        ref={setCombinedRef}
        name={name}
        value={value}
        defaultValue={defaultValue}
        variant={variant}
        size={size}
        isDisabled={isDisabled}
        inputMode="text"
        placeholder={placeholder}
        autoComplete="off"
        type="text"
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        pr="8"
        pl="8"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            triggerSearch();
          }
          if (onKeyDown) onKeyDown(e);
        }}
      />
    </InputGroup>
  );
});

export { BaseInputSearch };
