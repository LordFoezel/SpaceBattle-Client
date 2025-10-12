import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../repositories/auth.ts";
import { requestVerificationEmail } from "../repositories/auth.ts";
import { SmallCard } from '../components/layout/SmallCard.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { EmailLabel } from '../components/label/EmailLabel.jsx';
import { PasswordLabel } from '../components/label/PasswordLabel.jsx';
import { LoginButton } from "../components/button/LoginButton.jsx";
import { ToRegisterButton } from "../components/button/ToRegisterButton.jsx";
import { ToForgotButton } from "../components/button/ToForgotButton.jsx";
import { TransparentCard } from "../components/layout/TransparentCard.jsx";
import { AuthTokenHelper } from "../helper/authToken.js";
import { ErrorHelper } from "../helper/errorHelper.js";

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

  useEffect(() => {
    try {
      const token = AuthTokenHelper.getStoredToken();
      if (!token) return;
      const payload = AuthTokenHelper.decode(token);
      const exp = Number(payload?.exp);
      if (Number.isFinite(exp) && exp * 1000 > Date.now()) {
      notify.warning(t("login.alreadyLoggedIn"));
      setTimeout(() => navigate("/dashboard", { replace: true }), 2500);
      }
    } catch {
      /* ignore token errors */
    }
  }, [navigate]);

  async function onClickLogin() {
    if (!email) {
      notify.warning(t("message.noEmail"));
      return;
    }
    if (!password) {
      notify.warning(t("message.noPassword"));
      return;
    }

    try {
      const auth = await loginRequest({ email, password });

      try {
        window.localStorage.setItem("spacebattle.access_token", auth.access_token);
        window.localStorage.setItem("spacebattle.user", JSON.stringify(auth.user));
        window.localStorage.setItem("spacebattle.default_email", email);
      } catch {
        /* ignore storage errors */
      }

      navigate("/dashboard", { replace: true });

    } catch (error) {
      const code = ErrorHelper.handleError(error);
      switch (code) {
        case "USER_NOT_VALIDATED":
          try {
            await requestVerificationEmail({ email });
          } catch { /* ignore */ }
          break;
        case "422":
          setEmail("");
          break;
        default:
          break
      }
      setPassword("");
    }
  }

  return (
    <section className="login-page pt-20">
      <SmallCard>
        <PageHeader title={t("page.login.title")} info={t("page.login.info")} />
        <EmailLabel value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordLabel value={password} onChange={(e) => setPassword(e.target.value)} />
        <TransparentCard direction="col">
          <LoginButton onClick={onClickLogin} />
          <TransparentCard direction="row">
            <ToForgotButton />
            <ToRegisterButton />
          </TransparentCard>
        </TransparentCard>
      </SmallCard>
    </section>
  );
}
