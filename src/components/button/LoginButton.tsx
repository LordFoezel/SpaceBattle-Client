import type { MouseEventHandler } from "react";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";

interface LoginButtonProps {
  name?: string;
  isDisabled?: boolean;
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

const LoginButton = function LoginButton({
  name = "login",
  isDisabled,
  variant,
  size,
  colorScheme,
  onClick,
  ...rest
}: LoginButtonProps) {
  return (
    <BaseButton name={name} onClick={onClick} isDisabled={isDisabled} variant={variant} size={size} colorScheme={colorScheme} {...rest}>
      <ButtonText>
        {globalThis.t("login.login")}
      </ButtonText>
    </BaseButton>
  );
};

export { LoginButton };




