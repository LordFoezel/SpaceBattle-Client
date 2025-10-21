import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";

interface ToRegisterButtonProps {
  name?: string;
  isDisabled?: boolean;
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

const ToRegisterButton = function ToRegisterButton({
  name = "toRegistration",
  isDisabled,
  variant = "subtle",
  size,
  colorScheme,
  onClick,
  ...rest
}: ToRegisterButtonProps) {
  return (
    <BaseButton name={name} variant={variant} isDisabled={isDisabled} size={size} colorScheme={colorScheme} onClick={onClick} {...rest}>
      <Link to="/register">
        <ButtonText>
          {globalThis.t("login.toRegistration")}
        </ButtonText>
      </Link>
    </BaseButton>
  );
};

export { ToRegisterButton };



