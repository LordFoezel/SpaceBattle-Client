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

