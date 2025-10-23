import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";

interface ToForgotButtonProps {
  isDisabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: string;
  [key: string]: any;
}

const ToForgotButton = function ToForgotButton({
  isDisabled,
  size,
  colorScheme,
  ...rest
}: ToForgotButtonProps) {
  return (
    <BaseButton name="forgot-password" variant="subtle" isDisabled={isDisabled} size={size} colorScheme={colorScheme} {...rest}>
      <Link to="/forgot-password">
        <ButtonText>
          {globalThis.t("login.forgotPassword")}
        </ButtonText>
      </Link>
    </BaseButton>
  );
};

export { ToForgotButton };



