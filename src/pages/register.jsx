import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../repositories/auth.ts";
import { requestVerificationEmail } from "../repositories/auth.ts";
import { SmallCard } from '../components/layout/SmallCard.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { EmailLabel } from '../components/label/EmailLabel.jsx';
import { PasswordLabel } from '../components/label/PasswordLabel.jsx';
import { NameLabel } from '../components/label/NameLabel.jsx';
import { RegisterButton } from "../components/button/RegisterButton.jsx";
import { TransparentCard } from "../components/layout/TransparentCard.jsx";
import { AuthTokenHelper } from "../helper/authToken.js";
import { ErrorHelper } from "../helper/errorHelper.js";
import { ToLoginButton } from "../components/button/ToLoginButton.jsx";
import { ToForgotButton } from "../components/button/ToForgotButton.jsx";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => {
    try {
      return window.localStorage.getItem("spacebattle.default_email") || "";
    } catch {
      return "";
    }
  });

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function onClickRegister() {
    if (!email) {
      notify.warning(t("message.noEmail"));
      return;
    }
    if (!password) {
      notify.warning(t("message.noPassword"));
      return;
    }
    if (!name) {
      notify.warning(t("message.noName"));
      return;
    }

    try {
      await registerRequest({
        email,
        password,
        name,
      });
      notify.info(t("message.registerSuccess"));
      try {
        await requestVerificationEmail({ email });
      } catch { /* ignore */ }

      setTimeout(() => navigate("/login", { replace: true }), 2500);
    } catch (error) {
      const code = ErrorHelper.handleError(error);
      setEmail("");
      setName("");
      setPassword("");
    }

  }

  return (
    <section className="register-page pt-20">
      <SmallCard>
        <PageHeader title={t("page.register.title")} info={t("page.register.info")} />
        <EmailLabel value={email} onChange={(e) => setEmail(e.target.value)} />
        <NameLabel value={name} onChange={(e) => setName(e.target.value)} />
        <PasswordLabel value={password} onChange={(e) => setPassword(e.target.value)} />
        <TransparentCard direction="col">
          <RegisterButton onClick={onClickRegister} />
          <TransparentCard direction="row">
            <ToLoginButton />
            <ToForgotButton />
          </TransparentCard>
        </TransparentCard>
      </SmallCard>
    </section>
  );
}
