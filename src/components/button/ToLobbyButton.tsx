import type { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";

interface ToLobbyButtonProps {
  isDisabled?: boolean;
}

const ToLobbyButton = function ToLobbyButton({
  isDisabled,
}: ToLobbyButtonProps) {
  return (
    <BaseButton name="to-lobby" isDisabled={isDisabled}>
      <Link to="/lobby">
        <ButtonText>
          {globalThis.t("userSetting.toLobby")}
        </ButtonText>
      </Link>
    </BaseButton>
  );
};

export { ToLobbyButton };



