import { BaseButton } from "../base/button/BaseButton";
import { IconCross } from "../icon/IconCross";
import { deleteOne as deletePlayer } from "../../repositories/players";
import { ErrorHelper } from "../../helper/errorHelper";
import { AdminRoleChecker } from "../roleChecker/AdminRoleChecker";

interface ButtonProps {
  isDisabled?: boolean;
  playerId: number;
  onDeleted?: (id: number) => void;
}

const DeletePlayerButton = function DeletePlayerButton({
  isDisabled,
  playerId,
  onDeleted,
}: ButtonProps) {

 async function onClick() {
    try {
      await deletePlayer(playerId);
      onDeleted?.(playerId);
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



