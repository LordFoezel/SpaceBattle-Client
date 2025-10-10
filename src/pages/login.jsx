import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, FormHelperText, Button, Alert, AlertIcon } from "@chakra-ui/react";
// Legacy components kept for secondary actions
import ButtonRouterRegister from "../components/buttonsOld/ButtonRouterRegister.jsx";
import ButtonForgotPassword from "../components/buttonsOld/ButtonForgotPassword.jsx";
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
            <Input
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={(() => {
                const key = "login.email.placeholder";
                const val = t(key);
                return val === key ? "dein.name@example.com" : val;
              })()}
            />
            <FormHelperText>{DEFAULT_HINT}</FormHelperText>
          </FormControl>

          <FormControl isDisabled={isSubmitting}>
            <FormLabel>{t("login.password")}</FormLabel>
            <Input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
        </div>

        <div className="flex flex-col gap-3">
          <Button type="submit" colorScheme="blue" width="100%" isLoading={isSubmitting} loadingText={t("login.login")}>
            {buttonLabel}
          </Button>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <ButtonForgotPassword className="px-0 text-xs" />
            <ButtonRouterRegister variant="ghost" size="sm" />
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




