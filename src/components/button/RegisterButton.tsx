import type { MouseEventHandler } from "react";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";

interface RegisterButtonProps {
  name?: string;
  isDisabled?: boolean;
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

const RegisterButton = function RegisterButton({
  name = "register",
  isDisabled,
  variant,
  size,
  colorScheme,
  onClick,
  ...rest
}: RegisterButtonProps) {
  return (
    <BaseButton name={name} onClick={onClick} isDisabled={isDisabled} variant={variant} size={size} colorScheme={colorScheme} {...rest}>
      <ButtonText>
        {globalThis.t("login.register")}
      </ButtonText>
    </BaseButton>
  );
};

export { RegisterButton };




