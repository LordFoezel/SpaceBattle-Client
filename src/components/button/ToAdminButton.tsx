import { BaseButtonLink } from "../base/button/BaseButtonLink";
import { ButtonText } from "../text/ButtonText";
import { AdminRoleChecker } from "../roleChecker/AdminRoleChecker";
import { IconGear } from "../icon/IconGear";


interface ButtonProps {
  isDisabled?: boolean;
}

const ToAdminButton = function ToAdminButton({
  isDisabled,
}: ButtonProps) {
  return (
    <AdminRoleChecker>
      <BaseButtonLink
        name="to-admin"
        isDisabled={isDisabled}
        width="40"
        to="/admin"
        aria-label={globalThis.t?.("admin.go") ?? "Admin"}
      >
        <ButtonText>
          <IconGear />
        </ButtonText>
      </BaseButtonLink>
    </AdminRoleChecker>
  );
};

export { ToAdminButton };



