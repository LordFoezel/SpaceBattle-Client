import type { MouseEventHandler } from "react";
import { BaseButton } from "../base/button/BaseButton";
import { ButtonText } from "../text/ButtonText";

interface SendMailForgotPasswordButtonProps {
  name?: string;
  isDisabled?: boolean;
  variant?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

const SendMailForgotPasswordButton = function SendMailForgotPasswordButton({
  name = "sendMailForgotPasswordButton",
  isDisabled,
  variant,
  size,
  colorScheme,
  onClick,
  ...rest
}: SendMailForgotPasswordButtonProps) {
  return (
    <BaseButton name={name} onClick={onClick} isDisabled={isDisabled} variant={variant} size={size} colorScheme={colorScheme} {...rest}>
      <ButtonText>
        {globalThis.t("login.sendMailForgotPasswordButton")}
      </ButtonText>
    </BaseButton>
  );
};

export { SendMailForgotPasswordButton };



