import { forwardRef } from "react";
import BaseInput from "./baseInput.jsx";

const BaseInputEmail = forwardRef(function BaseInputEmail(props, ref) {
  return (
    <BaseInput
      ref={ref}
      type="email"
      autoComplete="email"
      inputMode="email"
      label="E-Mail-Adresse"
      placeholder="dein.name@example.com"
      {...props}
    />
  );
});

export default BaseInputEmail;
