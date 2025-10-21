import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";

interface ToLoginButtonProps {
  name?: string;
  isDisabled?: boolean;
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

const ToLoginButton = function ToLoginButton({
  name = "toLogin",
  isDisabled,
  variant = "subtle",
  size,
  colorScheme,
  onClick,
  ...rest
}: ToLoginButtonProps) {
  return (
    <BaseButton name={name} variant={variant} isDisabled={isDisabled} size={size} colorScheme={colorScheme} onClick={onClick} {...rest}>
      <Link to="/login">
        <ButtonText>
          {globalThis.t("login.toLogin")}
        </ButtonText>
      </Link>
    </BaseButton>
  );
};

export { ToLoginButton };



