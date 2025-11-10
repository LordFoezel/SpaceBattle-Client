import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";
import { IconLobby } from "../icon/IconLobby";

interface ToLobbyButtonProps {
  isDisabled?: boolean;
}

const ToLobbyButton = function ToLobbyButton({
  isDisabled,
}: ToLobbyButtonProps) {
  return (
    <BaseButton name="to-lobby" isDisabled={isDisabled}>
      <Link to="/lobby">
      <IconLobby />
      </Link>
    </BaseButton>
  );
};

export { ToLobbyButton };



