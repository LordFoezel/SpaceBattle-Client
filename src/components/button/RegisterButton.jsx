import { BaseButton } from "../base/button/BaseButton.jsx";
import { ButtonText } from "../text/ButtonText.jsx";

const RegisterButton = function RegisterButton({ onClick }) {

  return (
    <BaseButton name="register" onClick={onClick}>
      <ButtonText>
        {t("login.register")}
      </ButtonText>
    </BaseButton>
  );
};

export { RegisterButton };

