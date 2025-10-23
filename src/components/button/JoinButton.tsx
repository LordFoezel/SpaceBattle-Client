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
    // todo: join to lobby
  }

  return (
    <BaseButton name="join" onClick={onClick} isDisabled={isDisabled} size="sm" height="full">
      <ButtonText>
        {globalThis.t("lobby.join")}
      </ButtonText>
    </BaseButton>
  );
};

export { JoinButton };




