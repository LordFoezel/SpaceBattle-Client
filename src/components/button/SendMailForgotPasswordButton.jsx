import { BaseButton } from "../base/button/BaseButton.jsx";
import { ButtonText } from "../text/ButtonText.jsx";

const SendMailForgotPasswordButton = function SendMailForgotPasswordButton({ onClick, isDisabled }) {

  return (
    <BaseButton name="sendMailForgotPasswordButton" onClick={onClick} isDisabled={isDisabled}>
      <ButtonText>
        {t("login.sendMailForgotPasswordButton")}
      </ButtonText>
    </BaseButton>
  );
};

export { SendMailForgotPasswordButton };
