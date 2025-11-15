import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton";
import { IconLobby } from "../icon/IconLobby";

interface ToLobbyButtonProps {
  isDisabled?: boolean;
}

const ToLobbyButton = function ToLobbyButton({
  isDisabled,
}: ToLobbyButtonProps) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (isDisabled) {
      return;
    }
    navigate("/lobby", { replace: true });
  }, [isDisabled, navigate]);

  return (
    <BaseButton
      name="to-lobby"
      isDisabled={isDisabled}
      onClick={handleClick}
      type="button"
      aria-label={globalThis.t?.("lobby.back")}
    >
      <IconLobby />
    </BaseButton>
  );
};

export { ToLobbyButton };
