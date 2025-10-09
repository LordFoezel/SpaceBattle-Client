import { forwardRef } from "react";
import BaseInputText from "./BaseInputText.jsx";

const BaseInputEmail = forwardRef(function BaseInputEmail({
  label = t("login.email"),
  placeholder,
  ...props
}, ref) {
  const phKey = "login.email.placeholder";
  const ph = placeholder ?? (t(phKey) === phKey ? "dein.name@example.com" : t(phKey));
  return (
    <BaseInputText
      ref={ref}
      type="email"
      autoComplete="email"
      inputMode="email"
      label={label}
      placeholder={ph}
      {...props}
    />
  );
});

export default BaseInputEmail;

