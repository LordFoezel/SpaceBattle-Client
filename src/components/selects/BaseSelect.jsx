import { forwardRef } from "react";
import { Select   } from "@chakra-ui/react";
import { cn } from "../../helper/classNames.js";
import colors from "../../theme/colors.js";

const BaseSelect = forwardRef(function BaseSelect({
  name, // for forms
  value,
  variant = 'outline', // outline, subtle, flushed
  size = 'md', // xs, sm, md, lg
  isDisabled = false,  
  placeholder = '',
  onChange,
  options=[], // SelectOption[]
}, ref) {


  const className = "w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40";
  const hasCategories = Array.isArray(options) && options.some(o => !!o?.category);
  const ungrouped = Array.isArray(options) ? options.filter(o => !o?.category) : [];
  const categories = hasCategories
    ? Array.from(new Set(options.filter(o => !!o?.category).map(o => o.category)))
    : [];

  return (
      <Select  
      ref={ref}
      name={name}
      value={value}
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      placeholder={placeholder}
      onChange={onChange}
      className={cn(className)}
      iconColor={colors.iconMuted}
      bg={colors.surface}
      color={colors.text}
      borderColor={colors.border}
      focusBorderColor={colors.focusBorder}
      sx={{
        option: {
          backgroundColor: colors.surface,
          color: colors.text,
        },
        'option:checked': {
          backgroundColor: colors.optionCheckedBg,
          color: colors.optionCheckedText,
        },
        'option:disabled': {
          color: colors.textMuted,
        },
        optgroup: {
          color: colors.groupTitle,
          backgroundColor: colors.surface, // make category header dark as well
        },
      }}
    >
      {!hasCategories && (
        Array.isArray(options) && options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            disabled={opt.selectable === false}
          >
            {opt.label}
          </option>
        ))
      )}

      {hasCategories && (
        <>
          {ungrouped.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.selectable === false}
            >
              {opt.label}
            </option>
          ))}
          {categories.map((cat) => (
            <optgroup key={cat} label={cat}>
              {options
                .filter((o) => o.category === cat)
                .map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.selectable === false}
                  >
                    {opt.label}
                  </option>
                ))}
            </optgroup>
          ))}
        </>
      )}
      </Select>
  );
});

export { BaseSelect };
