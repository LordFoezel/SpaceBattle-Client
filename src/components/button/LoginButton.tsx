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
  isDisabled,
  variant,
  size,
  colorScheme,
  onClick,
}: LoginButtonProps) {
  return (
    <BaseButton name="login" onClick={onClick} isDisabled={isDisabled} variant={variant} size={size} colorScheme={colorScheme}>
      <ButtonText>
        {globalThis.t("login.login")}
      </ButtonText>
    </BaseButton>
  );
};

export { LoginButton };




