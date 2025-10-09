import { forwardRef } from "react";
import BaseInputText from "./BaseInputText.jsx";

const BaseInputPassword = forwardRef(function BaseInputPassword({
  label = t("login.password"),
  placeholder = "********",
  ...props
}, ref) {
  return (
    <BaseInputText
      ref={ref}
      type="password"
      autoComplete="current-password"
      label={label}
      placeholder={placeholder}
      {...props}
    />
  );
});

export default BaseInputPassword;

