import type { MouseEventHandler } from "react";
import { BaseButtonLink } from "../base/button/BaseButtonLink";
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
    <BaseButtonLink
      name={name}
      variant={variant}
      isDisabled={isDisabled}
      size={size}
      colorScheme={colorScheme}
      onClick={onClick}
      to="/register"
      {...rest}
    >
      <ButtonText>
        {globalThis.t("login.toRegistration")}
      </ButtonText>
    </BaseButtonLink>
  );
};

export { ToRegisterButton };
