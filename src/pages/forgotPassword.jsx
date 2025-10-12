import { useNavigate } from "react-router-dom";
import { requestPasswordResetEmail } from "../repositories/auth.ts";
import { useState } from "react";
import { SmallCard } from '../components/layout/SmallCard.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { EmailLabel } from '../components/label/EmailLabel.jsx';
import { SendMailForgotPasswordButton } from "../components/button/SendMailForgotPasswordButton.jsx";
import { ToRegisterButton } from "../components/button/ToRegisterButton.jsx";
import { ToLoginButton } from "../components/button/ToLoginButton.jsx";
import { TransparentCard } from "../components/layout/TransparentCard.jsx";
import { ErrorHelper } from "../helper/errorHelper.js";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => {
    try {
      return window.localStorage.getItem("spacebattle.default_email") || "";
    } catch {
      return "";
    }
  });

  const disabled = !email;

  async function onClickSendMail() {
    if (!email) {
      notify.warning(t("message.noEmail"));
      return;
    }

    try {
      await requestPasswordResetEmail({ email });
      notify.info(t("message.resetPasswordSent"));

      setTimeout(() => navigate("/login", { replace: true }), 2500);

    } catch (error) {
      ErrorHelper.handleError(error);
      setEmail("");
    }
  }

  return (
    <section className="password-forgot-page pt-20">
      <SmallCard>
        <PageHeader title={t("page.passwordForgot.title")} info={t("page.passwordForgot.info")} />
        <EmailLabel value={email} onChange={(e) => setEmail(e.target.value)} />
        <TransparentCard direction="col">
          <SendMailForgotPasswordButton onClick={onClickSendMail} isDisabled={disabled} />
          <TransparentCard direction="row">
            <ToLoginButton />
            <ToRegisterButton />
          </TransparentCard>
        </TransparentCard>
      </SmallCard>
    </section>
  );
}
