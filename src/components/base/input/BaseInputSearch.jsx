import { forwardRef } from "react";
import { BaseInput } from "./BaseInput.jsx";

const BaseInputSearch = forwardRef(function BaseInputSearch({
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
  onKeyDown, // optional extra key handling
  onSearch, // (query: string) => void
}, ref) {
  const triggerSearch = () => {
    const current = typeof value !== 'undefined' ? value : ref?.current?.value || '';
    if (onSearch) onSearch(current);
  };

  const prMap = { xs: 12, sm: 12, md: 14, lg: 16 };
  const paddingRight = prMap[size] ?? 14;

  return (
    <BaseInput
      ref={ref}
      name={name}
      value={value}
      defaultValue={defaultValue}
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      inputMode="search"
      placeholder={placeholder}
      autoComplete="off"
      type="search"
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      pr={paddingRight}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          triggerSearch();
        }
        if (onKeyDown) onKeyDown(e);
      }}
    />
  );
});

export { BaseInputSearch };
