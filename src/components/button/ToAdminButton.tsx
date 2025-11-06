import { Link } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";
import { AdminRoleChecker } from "../roleChecker/AdminRoleChecker";

interface ButtonProps {
  isDisabled?: boolean;
}

const ToAdminButton = function ToAdminButton({
  isDisabled,
}: ButtonProps) {
  return (
    <AdminRoleChecker>
      <BaseButton name="to-admin" isDisabled={isDisabled} width="40">
        <Link to="/admin">
          <ButtonText>
            {globalThis.t("admin.toAdmin")}
          </ButtonText>
        </Link>
      </BaseButton>
    </AdminRoleChecker>
  );
};

export { ToAdminButton };



