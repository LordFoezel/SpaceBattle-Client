import { Link } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton.jsx";
import { ButtonText } from "../text/ButtonText.jsx";

const ToRegisterButton = function ToRegisterButton() {

  return (
    <BaseButton name="toRegistration" variant="subtile" >
      <Link to="/register">
        <ButtonText>
          {t("login.toRegistration")}
        </ButtonText>
        </Link>
    </BaseButton>
  );
};

export { ToRegisterButton };
