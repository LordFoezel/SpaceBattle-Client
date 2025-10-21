import { useNavigate } from "react-router-dom";
import { requestPasswordResetEmail } from "../repositories/auth";
import { useState } from "react";
import { SmallCard } from '../components/layout/SmallCard';
import { PageHeader } from '../components/layout/PageHeader';
import { EmailLabel } from '../components/label/EmailLabel';
import { SendMailForgotPasswordButton } from "../components/button/SendMailForgotPasswordButton";
import { ToRegisterButton } from "../components/button/ToRegisterButton";
import { ToLoginButton } from "../components/button/ToLoginButton";
import { TransparentCard } from "../components/layout/TransparentCard";
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
      globalThis.notify.warning(globalThis.t("error.notProvided", [globalThis.t("core.email")]));
      return;
    }

    try {
      await requestPasswordResetEmail({ email });
      globalThis.notify.info(globalThis.t("message.resetPasswordSent"));

      setTimeout(() => navigate("/login", { replace: true }), 2500);

    } catch (error) {
      ErrorHelper.handleError(error);
      setEmail("");
    }
  }

  return (
    <section className="password-forgot-page pt-20">
      <SmallCard>
        <PageHeader title={globalThis.t("page.passwordForgot.title")} info={globalThis.t("page.passwordForgot.info")} />
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



