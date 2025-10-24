import type { MouseEventHandler } from "react";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";
import { Link } from "react-router-dom";

interface ButtonProps {
  name?: string;
  isDisabled?: boolean;
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

const LogoutButton = function LogoutButton({
  name = "logout",
  isDisabled,
  variant,
  size,
  colorScheme,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <BaseButton name="logout" onClick={onClick} isDisabled={isDisabled} variant={variant} size={size} colorScheme="red" {...rest}>
      <Link to="/login">
        <ButtonText>
          {globalThis.t("login.userSetting.logout")}
        </ButtonText>
      </Link>
    </BaseButton>
  );
};

export { LogoutButton };




