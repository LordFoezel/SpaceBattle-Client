import { forwardRef, type ChangeEventHandler, type FocusEventHandler, type KeyboardEventHandler } from "react";
import { InputGroup, InputRightElement, InputLeftElement } from "@chakra-ui/react";
import { BaseInput } from "./BaseInput";

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

   const CrossIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.1em"
      height="1.1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );


  const SearchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.1em"
      height="1.1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
  const triggerSearch = () => {
    const current = typeof value !== 'undefined' ? value : ref?.current?.value || '';
    if (onSearch) onSearch(current);
  };

  const handleClearClick = (e) => {
    // FIXME: clean value
    // 1 -> https://github.com/users/LordFoezel/projects/2?pane=issue&itemId=133339747&issue=LordFoezel%7CSpaceBattle%7C24
  };

  return (
    <InputGroup size={size}>
      <InputRightElement pointerEvents="auto" height="100%" onClick={handleClearClick}>
        <CrossIcon />
      </InputRightElement>
       <InputLeftElement pointerEvents="none"  height="100%">
        <SearchIcon /> 
      </InputLeftElement>
      <BaseInput
      ref={ref}
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


