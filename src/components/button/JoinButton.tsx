import type { MouseEventHandler } from "react";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";

interface JoinButtonProps {
  isDisabled?: boolean;
  matchId: number;
}

const JoinButton = function JoinButton({
  isDisabled,
  matchId,
}: JoinButtonProps) {

  function onClick() {
    console.log("click join", matchId);
  }

  return (
    <BaseButton name="join" onClick={onClick} isDisabled={isDisabled} size="sm">
      <ButtonText>
        {globalThis.t("lobby.join")}
      </ButtonText>
    </BaseButton>
  );
};

export { JoinButton };




