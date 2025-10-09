import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseInputEmail from "../components/inputs/baseInputEmail.jsx";
import BaseInput from "../components/inputs/baseInput.jsx";
import ButtonLogin from "../components/buttons/ButtonLogin.jsx";
import ButtonRouterRegister from "../components/buttons/ButtonRouterRegister.jsx";
import ButtonForgotPassword from "../components/buttons/ButtonForgotPassword.jsx";
import Title from "../components/layout/title.jsx";
import { panelClass } from "../styles/theme.js";
import { login as loginRequest } from "../repositories/auth.ts";
import { requestVerificationEmail } from "../repositories/auth.ts";

const DEFAULT_HINT = "Nutze die Demo-Zugangsdaten oder registriere dich.";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const isSubmitting = status === "loading";

  const buttonLabel = useMemo(() => {
    if (isSubmitting) {
      return "Wird eingeloggt...";
    }
    return t("login.login");
  }, [isSubmitting]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      if (!email || !password) {
        throw new Error("Bitte E-Mail und Passwort eingeben.");
      }

      const auth = await loginRequest({ email, password });

      try {
        window.localStorage.setItem("spacebattle.access_token", auth.access_token);
        window.localStorage.setItem("spacebattle.user", JSON.stringify(auth.user));
      } catch {
        /* ignore storage errors */
      }

      setStatus("success");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setStatus("error");
      const anyErr = err ?? {};
      const code = (anyErr && typeof anyErr === "object" && anyErr.payload && anyErr.payload.code) ? anyErr.payload.code : undefined;

      if (code === "USER_NOT_VALIDATED") {
        try { await requestVerificationEmail({ email }); } catch { /* ignore */ }
        setError("Dein Konto ist noch nicht verifiziert. Wir haben dir eine Bestätigungs-E-Mail gesendet.");
      } else {
        setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      }
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10">
      <Title
        title={t("login.welcome")}
        subtitle="Melde dich an, um deine Flotte zu verwalten."
      />

      <form
        onSubmit={handleSubmit}
        className={`${panelClass} w-full max-w-md space-y-6`}
      >
        <div className="space-y-4">
          <BaseInputEmail
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            hint={DEFAULT_HINT}
            disabled={isSubmitting}
          />
          <BaseInput
            label={t("login.password")}
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-3">
          <ButtonLogin className="w-full" disabled={isSubmitting}>
            {buttonLabel}
          </ButtonLogin>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <ButtonForgotPassword className="px-0 text-xs" />
            <ButtonRouterRegister variant="ghost" size="sm" />
          </div>
        </div>

        {status === "success" ? (
          <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            Anmeldung erfolgreich ? willkommen zurueck.
          </p>
        ) : null}

        {error ? (
          <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            {error}
          </p>
        ) : null}
      </form>
    </section>
  );
}




