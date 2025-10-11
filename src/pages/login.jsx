import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../repositories/auth.ts";
import { requestVerificationEmail } from "../repositories/auth.ts";
import { SmallCard } from '../components/layout/SmallCard.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { EmailLabel } from '../components/label/EmailLabel.jsx';
import { PasswordLabel } from '../components/label/PasswordLabel.jsx';
import { LoginButton } from "../components/button/LoginButton.jsx";

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
      const anyErr = error ?? {};
      const code = (anyErr && typeof anyErr === "object" && anyErr.payload && anyErr.payload.code) ? anyErr.payload.code : undefined;
      if (code === "USER_NOT_VALIDATED") {
        try {
          await requestVerificationEmail({ email });
        } catch { /* ignore */ }
        notify.warning("Dein Konto ist noch nicht verifiziert. Wir haben dir eine Bestätigungs-E-Mail gesendet.");
      } else { 
        notify.warning(error instanceof Error ? error.message : "Unbekannter Fehler");
      }
    }
  }

  return (
    <section className="login-page pt-20">
      <SmallCard>
        <PageHeader title={t("page.login.title")} info={t("page.login.info")} />
        <EmailLabel defaultValue={email} onBlur={(e) => setEmail(e.target.value)} />
        <PasswordLabel onBlur={(e) => setPassword(e.target.value)} />
        <LoginButton onClick={onClickLogin} />
      </SmallCard>
    </section>
  );
}

