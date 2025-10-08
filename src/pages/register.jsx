import { useState } from "react";
import BaseInputEmail from "../components/inputs/baseInputEmail.jsx";
import BaseInput from "../components/inputs/baseInput.jsx";
import ButtonRegister from "../components/buttons/ButtonRegister.jsx";
import ButtonRouterLogin from "../components/buttons/ButtonRouterLogin.jsx";
import Title from "../components/layout/title.jsx";
import { panelClass } from "../styles/theme.js";
import { register as registerRequest, requestVerificationEmail } from "../repositories/auth.ts";
import { useNavigate } from "react-router-dom";

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
            label="E-Mail-Adresse"
            value={form.email}
            onChange={updateField("email")}
            disabled={isSubmitting}
          />
          <BaseInput
            label="Anzeigename"
            name="displayName"
            placeholder="Captain Jane"
            value={form.displayName}
            onChange={updateField("displayName")}
            disabled={isSubmitting}
          />
          <BaseInput
            label="Passwort"
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Sicheres Passwort"
            value={form.password}
            onChange={updateField("password")}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-3">
          <ButtonRegister className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Erstelle Konto..." : "Konto erstellen"}
          </ButtonRegister>
          <ButtonRouterLogin variant="ghost" size="sm" className="w-full" />
        </div>

        {successMessage ? (
          <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            {successMessage}
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
