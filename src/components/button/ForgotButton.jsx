import { BaseButton } from "../base/button/BaseButton.jsx";
import { ButtonText } from "../text/ButtonText.jsx";

const ForgotButton = function ForgotButton({ onClick }) {

  return (
    <BaseButton name="forgotPassword" variant="subtile" onClick={onClick}>
      <ButtonText>
        {t("login.forgotPassword")}
      </ButtonText>
    </BaseButton>
  );
};

export { ForgotButton };
