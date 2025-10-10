import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, FormHelperText, Alert, AlertIcon } from "@chakra-ui/react";
import { BaseInputEmail } from "../components/base/input/BaseInputEmail.jsx";
import { BaseInputPassword } from "../components/base/input/BaseInputPassword.jsx";
import { BaseButton } from "../components/base/button/BaseButton.jsx";
import Title from "../components/layout/title.jsx";
import { panelClass } from "../styles/theme.js";
import { login as loginRequest } from "../repositories/auth.ts";
import { requestVerificationEmail } from "../repositories/auth.ts";

const DEFAULT_HINT = "Nutze die Demo-Zugangsdaten oder registriere dich.";

export default function LoginPage() {
  // Using FormData; no controlled inputs needed
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
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") || "").trim();
      const password = String(formData.get("password") || "");

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
        try {
          const formData = new FormData(event.currentTarget);
          const email = String(formData.get("email") || "").trim();
          await requestVerificationEmail({ email });
        } catch { /* ignore */ }
        setError("Dein Konto ist noch nicht verifiziert. Wir haben dir eine Bestätigungs-E-Mail gesendet.");
      } else {
        setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      }
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10">
      <Title
        title={t("app.welcome")}
        subtitle="Melde dich an, um deine Flotte zu verwalten.  234523"
      />

      <form
        onSubmit={handleSubmit}
        className={`${panelClass} w-full max-w-md space-y-6`}
      >
        <div className="space-y-4">
          <FormControl isDisabled={isSubmitting}>
            <FormLabel>{t("login.email")}</FormLabel>
            <BaseInputEmail name="email" placeholder={(() => {
              const key = "login.email.placeholder";
              const val = t(key);
              return val === key ? "dein.name@example.com" : val;
            })()} />
            <FormHelperText>{DEFAULT_HINT}</FormHelperText>
          </FormControl>

          <FormControl isDisabled={isSubmitting}>
            <FormLabel>{t("login.password")}</FormLabel>
            <BaseInputPassword name="password" autoComplete="current-password" placeholder="********" />
          </FormControl>
        </div>

        <div className="flex flex-col gap-3">
          <BaseButton type="submit" colorScheme="blue" isDisabled={isSubmitting}>
            {isSubmitting ? "Wird eingeloggt..." : t("login.login")}
          </BaseButton>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <BaseButton variant="ghost" size="sm" onClick={() => navigate("/forgot-password")}>Passwort vergessen?</BaseButton>
            <BaseButton variant="ghost" size="sm" onClick={() => navigate("/register")}>{t("login.register")}</BaseButton>
          </div>
        </div>

        {status === "success" ? (
          <Alert status="success" borderRadius="lg">
            <AlertIcon />
            Anmeldung erfolgreich – willkommen zurück.
          </Alert>
        ) : null}

        {error ? (
          <Alert status="error" borderRadius="lg">
            <AlertIcon />
            {error}
          </Alert>
        ) : null}
      </form>
    </section>
  );
}




