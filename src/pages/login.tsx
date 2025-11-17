import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../repositories/auth";
import { requestVerificationEmail } from "../repositories/auth";
import { SmallCard } from '../components/layout/SmallCard';
import { PageHeader } from '../components/layout/PageHeader';
import { EmailLabel } from '../components/label/EmailLabel';
import { PasswordLabel } from '../components/label/PasswordLabel';
import { LoginButton } from "../components/button/LoginButton";
import { ToRegisterButton } from "../components/button/ToRegisterButton";
import { ToForgotButton } from "../components/button/ToForgotButton";
import { TransparentCard } from "../components/layout/TransparentCard";
import { AuthTokenHelper } from "../helper/authToken.js";
import { ErrorHelper } from "../helper/errorHelper.js";
import { CreateTestJob } from "../helper/jobs/testJob.js";

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

  const disabled = !email || !password;

  useEffect(() => {
    try {
      const token = AuthTokenHelper.getStoredToken();
      if (!token) return;
      const payload = AuthTokenHelper.decode(token);
      const exp = Number(payload?.exp);
      if (Number.isFinite(exp) && exp * 1000 > Date.now()) {
        globalThis.notify.warning(globalThis.t("message.alreadyLoggedIn"));
        setTimeout(() => navigate("/lobby", { replace: true }), 2500);
      }
    } catch {
      /* ignore token errors */
    }
  }, [navigate]);

  async function onClickLogin() {
    if (!email) {
      globalThis.notify.warning(globalThis.t("error.notProvided", [globalThis.t("core.email")]));
      return;
    }
    if (!password) {
      globalThis.notify.warning(globalThis.t("error.notProvided", [globalThis.t("core.password")]));
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

      navigate("/lobby", { replace: true });

    } catch (error) {
      const code = await ErrorHelper.handleError(error);
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
        <PageHeader title={globalThis.t("page.login.title")} info={globalThis.t("page.login.info")} />
        <EmailLabel value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordLabel value={password} onChange={(e) => setPassword(e.target.value)} />
        <TransparentCard direction="col">
          <LoginButton onClick={onClickLogin} isDisabled={disabled} />
          <TransparentCard direction="row">
            <ToForgotButton />
            <ToRegisterButton />
          </TransparentCard>
        </TransparentCard>
      </SmallCard>
    </section>
  );
}

