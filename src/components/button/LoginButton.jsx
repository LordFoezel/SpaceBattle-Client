import { BaseButton } from "../base/button/BaseButton.jsx";
import { ButtonText } from "../text/ButtonText.jsx";

const LoginButton = function LoginButton({ onClick, isDisabled }) {

  return (
    <BaseButton name="login" onClick={onClick} isDisabled={isDisabled} >
      <ButtonText>
        {t("login.login")}
      </ButtonText>
    </BaseButton>
  );
};

export { LoginButton };

