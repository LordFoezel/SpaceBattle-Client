import { useEffect, useState } from "react";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";
import { deleteOne as deletePlayer, fetchOne as fetchPlayer } from "../../repositories/players";
import { ErrorHelper } from "../../helper/errorHelper";
import { useNavigate } from "react-router-dom";
import { AuthTokenHelper } from "../../helper/authToken.js";

interface ButtonProps {
  isDisabled?: boolean;
  matchId: number;
  onLeave?: () => any;
}

const LeaveButton = function LeaveButton({
  isDisabled,
  matchId,
  onLeave,
}: ButtonProps) {

  const navigate = useNavigate();

  useEffect(() => {
    if (!matchId) {
      navigate("/lobby", { replace: true });
      return;
    }
  }, [matchId, navigate]);


  async function onClick() {
    const { id: userId } = AuthTokenHelper.getUserIdentity();
    try {
      const player = await fetchPlayer({ where: { userId, matchId } });
      deletePlayer(player.id);
      onLeave();
      navigate("/lobby", { replace: true });
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <BaseButton name="leave" onClick={onClick} isDisabled={isDisabled} colorScheme="red">
      <ButtonText>
        {globalThis.t("lobby.leave")}
      </ButtonText>
    </BaseButton>
  );
};

export { LeaveButton };




