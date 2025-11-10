import { BaseButton } from "../base/button/BaseButton";
import { Link } from "react-router-dom";
import { ButtonText } from "../text/ButtonText";
import { IconUserGear } from "../icon/IconUserGear";

interface UserSettingButtonProps {
}

const UserSettingButton = function UserSettingButton({
}: UserSettingButtonProps) {


  return (
    <BaseButton name="user-setting" width="20" >
      <Link to="/user-setting" >
        <ButtonText>
          <IconUserGear />
        </ButtonText>
      </Link>
    </BaseButton>
  );
};

export { UserSettingButton };




