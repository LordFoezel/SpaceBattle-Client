import { BaseButton } from "../base/button/BaseButton.jsx";
import { ButtonText } from "../text/ButtonText.jsx";

const RegisterButton = function RegisterButton({ onClick, isDisabled }) {

  return (
    <BaseButton name="register" onClick={onClick} isDisabled={isDisabled}>
      <ButtonText>
        {t("login.register")}
      </ButtonText>
    </BaseButton>
  );
};

export { RegisterButton };

