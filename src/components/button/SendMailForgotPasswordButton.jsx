import { BaseButton } from "../base/button/BaseButton.jsx";
import { ButtonText } from "../text/ButtonText.jsx";

const SendMailForgotPasswordButton = function SendMailForgotPasswordButton({ onClick }) {

  return (
    <BaseButton name="sendMailForgotPasswordButton" onClick={onClick}>
      <ButtonText>
        {t("login.sendMailForgotPasswordButton")}
      </ButtonText>
    </BaseButton>
  );
};

export { SendMailForgotPasswordButton };
