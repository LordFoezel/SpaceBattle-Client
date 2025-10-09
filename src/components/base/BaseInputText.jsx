import { forwardRef } from "react";
import { Input } from "@chakra-ui/react";
import BaseFormField from "./BaseFormField.jsx";

const BaseInputText = forwardRef(function BaseInputText({
  label,
  hint,
  isDisabled,
  formControlProps,
  ...props
}, ref) {
  return (
    <BaseFormField label={label} hint={hint} isDisabled={isDisabled} {...(formControlProps || {})}>
      <Input ref={ref} {...props} />
    </BaseFormField>
  );
});

export default BaseInputText;

