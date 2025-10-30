import { forwardRef, type FocusEventHandler } from "react";
import { NumberInput, NumberInputField } from "@chakra-ui/react";
import { cn } from "../../../helper/classNames.js";
import colors from "../../../theme/colors.js";

interface BaseInputNumberProps {
  name?: string;
  value?: any;
  defaultValue?: any;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  min?: number;
  max?: number;
  precision?: number;
  isDisabled?: boolean;
  placeholder?: string;
  onChange?: (e: any) => any;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

const BaseInputNumber = forwardRef<HTMLInputElement, BaseInputNumberProps>(function BaseInputNumber({
  name,
  value,
  defaultValue,
  size = 'md',
  min = 0,
  max,
  precision = 0,
  isDisabled = false,
  placeholder = "",
  onChange,
  onBlur,
  onFocus,
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
        inputMode="numeric"
      />
    </NumberInput>
  );
});

export { BaseInputNumber };
