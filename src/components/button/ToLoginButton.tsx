import type { MouseEventHandler } from "react";
import { BaseButtonLink } from "../base/button/BaseButtonLink";
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
    <BaseButtonLink
      name={name}
      variant={variant}
      isDisabled={isDisabled}
      size={size}
      colorScheme={colorScheme}
      onClick={onClick}
      to="/login"
      {...rest}
    >
      <ButtonText>
        {globalThis.t("login.toLogin")}
      </ButtonText>
    </BaseButtonLink>
  );
};

export { ToLoginButton };

