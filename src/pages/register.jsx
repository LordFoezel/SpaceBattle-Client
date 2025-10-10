import { useState } from "react";
import ButtonRouterLogin from "../components/buttonsOld/ButtonRouterLogin.jsx";
import Title from "../components/layout/title.jsx";
import { panelClass } from "../styles/theme.js";
import { register as registerRequest, requestVerificationEmail } from "../repositories/auth.ts";
import { useNavigate } from "react-router-dom";
import BaseInputEmail from "../components/base/BaseInputEmail.jsx";
import BaseInputText from "../components/base/BaseInputText.jsx";
import BaseInputPassword from "../components/base/BaseInputPassword.jsx";
import BaseSubmitButton from "../components/base/BaseSubmitButton.jsx";
import { Alert, AlertIcon } from "@chakra-ui/react";

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", displayName: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const isSubmitting = status === "loading";

  function updateField(field) {
    return (event) =>
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    setSuccessMessage(null);

    try {
      if (!form.email || !form.password || !form.displayName) {
        throw new Error("Bitte alle Felder ausfuellen.");
      }

      await registerRequest({
        email: form.email,
        password: form.password,
        name: form.displayName,
      });

      setSuccessMessage("Registrierung erfolgreich. Du kannst dich jetzt anmelden.");
      setForm({ email: "", displayName: "", password: "" });
      setStatus("success");
      await requestVerificationEmail({ email: form.email });
      setTimeout(() => navigate("/login"), 3500);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10">
      <Title
        title="Neue Besatzung registrieren"
        subtitle="Lege ein neues SpaceBattle-Konto an."
      />

      <form
        onSubmit={handleSubmit}
        className={`${panelClass} w-full max-w-md space-y-6`}
      >
        <div className="space-y-4">
          <BaseInputEmail
            label={t("login.email")}
            value={form.email}
            onChange={updateField("email")}
            isDisabled={isSubmitting}
          />
          <BaseInputText
            label={"Anzeigename"}
            name="displayName"
            placeholder="Captain Jane"
            value={form.displayName}
            onChange={updateField("displayName")}
            isDisabled={isSubmitting}
          />
          <BaseInputPassword
            label={t("login.password")}
            autoComplete="new-password"
            placeholder={"Sicheres Passwort"}
            value={form.password}
            onChange={updateField("password")}
            isDisabled={isSubmitting}
          />
        </div>

        <div className="space-y-3">
          <BaseSubmitButton isLoading={isSubmitting} loadingText={"Erstelle Konto..."}>
            Konto erstellen
          </BaseSubmitButton>
          <ButtonRouterLogin variant="ghost" size="sm" className="w-full" />
        </div>

        {successMessage ? (
          <Alert status="success" borderRadius="lg">
            <AlertIcon />
            {successMessage}
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
