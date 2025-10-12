import { Link } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton.jsx";
import { ButtonText } from "../text/ButtonText.jsx";

const ToForgotButton = function ToForgotButton() {

  return (
    <BaseButton name="forgotPassword" variant="subtile">
      <Link to="/forgot-password">
        <ButtonText>
          {t("login.forgotPassword")}
        </ButtonText>
      </Link>
    </BaseButton>
  );
};

export { ToForgotButton };
