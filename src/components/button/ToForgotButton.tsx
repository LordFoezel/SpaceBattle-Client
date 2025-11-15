import type { ComponentProps } from "react";
import { BaseButtonLink } from "../base/button/BaseButtonLink";
import { ButtonText } from "../text/ButtonText";

interface ToForgotButtonProps extends Omit<ComponentProps<typeof BaseButtonLink>, "to"> {}

const ToForgotButton = function ToForgotButton({
  variant = "subtle",
  ...rest
}: ToForgotButtonProps) {
  return (
    <BaseButtonLink
      name="forgot-password"
      variant={variant}
      to="/forgot-password"
      {...rest}
    >
      <ButtonText>
        {globalThis.t("login.forgotPassword")}
      </ButtonText>
    </BaseButtonLink>
  );
};

export { ToForgotButton };
