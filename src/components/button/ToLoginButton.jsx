import { Link } from "react-router-dom";
import { BaseButton } from "../base/button/BaseButton.jsx";
import { ButtonText } from "../text/ButtonText.jsx";

const ToLoginButton = function ToLoginButton() {

  return (
    <BaseButton name="toLogin" variant="subtile" > 
    <Link to="/login">
      <ButtonText>
        {t("login.toLogin")}
      </ButtonText>
     </Link> 
    </BaseButton>
  );
};

export { ToLoginButton };
