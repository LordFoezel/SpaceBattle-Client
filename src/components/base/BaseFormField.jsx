import { forwardRef } from "react";
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";

const BaseFormField = forwardRef(function BaseFormField({
  label,
  hint,
  isDisabled,
  children,
  ...props
}, ref) {
  return (
    <FormControl isDisabled={isDisabled} ref={ref} {...props}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      {children}
      {hint ? <FormHelperText>{hint}</FormHelperText> : null}
    </FormControl>
  );
});

export default BaseFormField;

