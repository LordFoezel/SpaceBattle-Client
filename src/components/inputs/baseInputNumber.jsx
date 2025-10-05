import { forwardRef } from "react";
import BaseInput from "./baseInput.jsx";

const BaseInputNumber = forwardRef(function BaseInputNumber({
  min = 0,
  max,
  step = 1,
  ...props
}, ref) {
  return (
    <BaseInput
      ref={ref}
      type="number"
      inputMode="numeric"
      min={min}
      max={max}
      step={step}
      {...props}
    />
  );
});

export default BaseInputNumber;
