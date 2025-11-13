import { BaseButton } from "../base/button/BaseButton";
import { IconCross } from "../icon/IconCross";
import { deleteOne as deletePlayer } from "../../repositories/players";
import { ErrorHelper } from "../../helper/errorHelper";
import { AdminRoleChecker } from "../roleChecker/AdminRoleChecker";
import { deleteOne, fetchAll } from "../../repositories/fleet";

interface ButtonProps {
  isDisabled?: boolean;
  playerId: number;
  matchId: number;
  onDeleted?: (id: number) => void;
}

const DeletePlayerButton = function DeletePlayerButton({
  isDisabled,
  playerId,
  matchId,
  onDeleted,
}: ButtonProps) {

  async function onClick() {
    try {
      await deletePlayer(playerId);
      onDeleted?.(playerId);
      const fleets = await fetchAll({ match_id: matchId, player_id: playerId });
      fleets.forEach((fleet) => {
        deleteOne(fleet.id);
      });
    } catch (error) {
      ErrorHelper.handleError(error);
    }
  }

  return (
    <AdminRoleChecker>
      <BaseButton name="delete" onClick={onClick} isDisabled={isDisabled} size="sm" colorScheme="red">
        <IconCross />
      </BaseButton>
    </AdminRoleChecker>
  );
};

export { DeletePlayerButton };



