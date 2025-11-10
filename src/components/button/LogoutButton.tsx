import type { MouseEvent, MouseEventHandler } from "react";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";
import { useNavigate } from "react-router-dom";
import { IconLogout } from "../icon/IconLogout";

interface ButtonProps {
  isDisabled?: boolean;
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  [key: string]: any;
}

const LogoutButton = function LogoutButton({
  isDisabled,
  variant,
  size,
}: ButtonProps) {
  const navigate = useNavigate();

  function onClickLogout() {
    try {
      window.localStorage.removeItem("spacebattle.access_token");
      window.localStorage.removeItem("spacebattle.user");
      navigate("/login", { replace: true })
    } catch {
      /* ignore storage errors */
    }
  }

  return (
    <BaseButton name="logout" onClick={onClickLogout} isDisabled={isDisabled} variant={variant} size={size} colorScheme="red">
      <IconLogout />
    </BaseButton>
  );
};

export { LogoutButton };



