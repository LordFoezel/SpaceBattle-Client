import { useState } from "react";
import { register as registerRequest, requestVerificationEmail } from "../repositories/auth.ts";
import { useNavigate } from "react-router-dom";
import { BaseInputEmail } from "../components/base/input/BaseInputEmail.jsx";
import { BaseInput } from "../components/base/input/BaseInput.jsx";
import { BaseInputPassword } from "../components/base/input/BaseInputPassword.jsx";
import { BaseButton } from "../components/base/button/BaseButton.jsx";
import { Alert, AlertIcon, FormControl, FormLabel } from "@chakra-ui/react";

export default function RegisterPage() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const isSubmitting = status === "loading";

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") || "").trim();
      const password = String(formData.get("password") || "");
      const displayName = String(formData.get("displayName") || "").trim();

      if (!email || !password || !displayName) {
        throw new Error("Bitte alle Felder ausfuellen.");
      }

      await registerRequest({
        email,
        password,
        name: displayName,
      });

      setSuccessMessage("Registrierung erfolgreich. Du kannst dich jetzt anmelden.");
      setStatus("success");
      try { (event.currentTarget).reset(); } catch {}
      await requestVerificationEmail({ email });
      setTimeout(() => navigate("/login"), 3500);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md space-y-6`}
      >
        <div className="space-y-4">
          <FormControl isDisabled={isSubmitting}>
            <FormLabel>{t("login.email")}</FormLabel>
            <BaseInputEmail name="email" placeholder={"dein.name@example.com"} />
          </FormControl>
          <FormControl isDisabled={isSubmitting}>
            <FormLabel>{"Anzeigename"}</FormLabel>
            <BaseInput name="displayName" placeholder="Captain Jane" />
          </FormControl>
          <FormControl isDisabled={isSubmitting}>
            <FormLabel>{t("login.password")}</FormLabel>
            <BaseInputPassword name="password" autoComplete="new-password" placeholder={"Sicheres Passwort"} />
          </FormControl>
        </div>

        <div className="space-y-3">
          <BaseButton type="submit" colorScheme="blue" isDisabled={isSubmitting}>
            {isSubmitting ? "Erstelle Konto..." : "Konto erstellen"}
          </BaseButton>
          <BaseButton variant="ghost" size="sm" onClick={() => navigate("/login")}>Zum Login</BaseButton>
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
