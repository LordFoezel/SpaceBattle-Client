import { forwardRef } from "react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { cn } from "../../../helper/classNames.js";
import colors from "../../../theme/colors.js";

const BaseInputNumber = forwardRef(function BaseInputNumber({
  name,
  value,
  defaultValue,
  size = 'md', // xs, sm, md, lg
  min = 0,
  max,
  precision = 0,
  isDisabled = false,
  placeholder = "",
  onChange, // (e) => set(...)
  onBlur, // on leave
  onFocus, // on enter
}, ref) {
  const className =
    "w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40";
  return (
    <NumberInput
      ref={ref}
      name={name}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      precision={precision}
      isDisabled={isDisabled}
      size={size}
      onChange={(valStr, valNum) => {
        if (!onChange) return;
        const syntheticEvent = { target: { value: valStr, valueAsNumber: valNum } };
        onChange(syntheticEvent);
      }}
    >
      <NumberInputField
        bg={colors.surface}
        className={cn(className)}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        size={size}
        inputMode="numeric"
      />
    </NumberInput>
  );
});

export { BaseInputNumber };

