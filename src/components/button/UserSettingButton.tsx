import { BaseButton } from "../base/button/BaseButton";
import { Link } from "react-router-dom";
import { ButtonText } from "../text/ButtonText";
import { IconGear } from "../icon/IconGear";

interface UserSettingButtonProps {
}

const UserSettingButton = function UserSettingButton({
}: UserSettingButtonProps) {


  return (
    <BaseButton name="join" size="sm" height="45" width="20" >
      <Link to="/user-setting" >
        <ButtonText>
          <IconGear />
        </ButtonText>
      </Link>
    </BaseButton>
  );
};

export { UserSettingButton };




