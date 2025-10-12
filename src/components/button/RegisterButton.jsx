import { BaseButton } from "../base/button/BaseButton.jsx";
import { ButtonText } from "../text/ButtonText.jsx";

const RegisterButton = function RegisterButton({ onClick }) {

  return (
    <BaseButton name="toRegistration" variant="subtile" onClick={onClick}>
      <ButtonText>
        {t("login.toRegistration")}
      </ButtonText>
    </BaseButton>
  );
};

export { RegisterButton };
