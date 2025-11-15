import { BaseButtonLink } from "../base/button/BaseButtonLink";
import { ButtonText } from "../text/ButtonText";
import { IconUserGear } from "../icon/IconUserGear";

interface UserSettingButtonProps {
}

const UserSettingButton = function UserSettingButton({
}: UserSettingButtonProps) {


  return (
    <BaseButtonLink
      name="user-setting"
      width="20"
      to="/user-setting"
      aria-label={globalThis.t?.("user.setting") ?? "User settings"}
    >
      <ButtonText>
        <IconUserGear />
      </ButtonText>
    </BaseButtonLink>
  );
};

export { UserSettingButton };




