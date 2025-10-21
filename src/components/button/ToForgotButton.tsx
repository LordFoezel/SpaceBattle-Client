import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";

interface ToForgotButtonProps {
  name?: string;
  isDisabled?: boolean;
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

const ToForgotButton = function ToForgotButton({
  name = "forgotPassword",
  isDisabled,
  variant = "subtle",
  size,
  colorScheme,
  onClick,
  ...rest
}: ToForgotButtonProps) {
  return (
    <BaseButton name={name} variant={variant} isDisabled={isDisabled} size={size} colorScheme={colorScheme} onClick={onClick} {...rest}>
      <Link to="/forgot-password">
        <ButtonText>
          {globalThis.t("login.forgotPassword")}
        </ButtonText>
      </Link>
    </BaseButton>
  );
};

export { ToForgotButton };



