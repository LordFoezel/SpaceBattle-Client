import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../repositories/auth.ts";
import { requestVerificationEmail } from "../repositories/auth.ts";
import { SmallCard } from '../components/layout/SmallCard.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { EmailLabel } from '../components/label/EmailLabel.jsx';
import { PasswordLabel } from '../components/label/PasswordLabel.jsx';
import { LoginButton } from "../components/button/LoginButton.jsx";
import { RegisterButton } from "../components/button/RegisterButton.jsx";
import { ForgotButton } from "../components/button/ForgotButton.jsx";
import { TransparentCard } from "../components/layout/TransparentCard.jsx";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => {
    try {
      return window.localStorage.getItem("spacebattle.default_email") || "";
    } catch {
      return "";
    }
  });

  const [password, setPassword] = useState("");

  async function onClickLogin() {
    if (!email) {
      notify.warning(t("warning.noEmail"));
      return;
    }
    if (!password) {
      notify.warning(t("warning.noPassword"));
      return;
    }

    try {
      const auth = await loginRequest({ email, password });

      try {
        window.localStorage.setItem("spacebattle.access_token", auth.access_token);
        window.localStorage.setItem("spacebattle.user", JSON.stringify(auth.user));
        window.localStorage.setItem("spacebattle.default_email", JSON.stringify(email));
      } catch {
        /* ignore storage errors */
      }

      navigate("/dashboard", { replace: true });

    } catch (error) {
      const code = error?.payload?.code || "";
      if(!code) console.log(error.message);
      
      switch (code) {
        case "USER_NOT_VALIDATED":
          try {
            await requestVerificationEmail({ email });
          } catch { /* ignore */ }
          break;
        default:
          break
      }
      setPassword("");
      notify.warning(t(`error.code.${code}`));
    }
  }

  function onClickForgot() {
    navigate("/forgot-password")
  }

  function onClickRegister() {
    navigate("/register")
  }

  return (
    <section className="login-page pt-20">
      <SmallCard>
        <PageHeader title={t("page.login.title")} info={t("page.login.info")} />
        <EmailLabel defaultValue={email} onBlur={(e) => setEmail(e.target.value)} />
        <PasswordLabel onBlur={(e) => setPassword(e.target.value)} />
        <LoginButton onClick={onClickLogin} />
        <TransparentCard direction="row">
          <ForgotButton onClick={onClickForgot} />
          <RegisterButton onClick={onClickRegister} />
        </TransparentCard>
      </SmallCard>
    </section>
  );
}

