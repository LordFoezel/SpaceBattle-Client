import { BaseButton } from "../base/button/BaseButton";
import { IconCross } from "../icon/IconCross";
import { deleteOne as deleteMatch } from "../../repositories/matches";
import { ErrorHelper } from "../../helper/errorHelper";
import { checkRole } from "../../auth/auth";
import { AdminRoleChecker } from "../roleChecker/AdminRoleChecker";

interface ButtonProps {
  isDisabled?: boolean;
  matchId: number;
  onDeleted?: () => void;
}

const DeleteMatchButton = function DeleteMatchButton({
  isDisabled,
  matchId,
  onDeleted,
}: ButtonProps) {

  function onClick() {
    try {
      deleteMatch(matchId);
      onDeleted?.();
    } catch (error) {

      ErrorHelper.handleError(error);
    }
  }

  return (
    <AdminRoleChecker>
      <BaseButton name="delete" onClick={onClick} isDisabled={isDisabled} size="sm" height="full" colorScheme="red">
        <IconCross />
      </BaseButton>
    </AdminRoleChecker>
  );
};

export { DeleteMatchButton };



