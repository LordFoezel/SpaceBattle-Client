import { useState } from "react";
import BaseInputEmail from "../components/base/BaseInputEmail.jsx";
import BaseSubmitButton from "../components/base/BaseSubmitButton.jsx";
import { Alert, AlertIcon } from "@chakra-ui/react";
import ButtonRouterLogin from "../components/buttons/ButtonRouterLogin.jsx";
import Title from "../components/layout/title.jsx";
import { panelClass } from "../styles/theme.js";
import { requestPasswordResetEmail } from "../repositories/auth.ts";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState(null);
  let isSubmitting = false;

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email) {
      setFeedback({ type: "error", message: "Bitte E-Mail-Adresse eingeben." });
      return;
    }
    try {
      isSubmitting = true
      await requestPasswordResetEmail({ email });
      setFeedback({
        type: "success",
        message: "Wenn ein Account existiert, senden wir dir in Kürze eine E-Mail.",
      });
      setEmail("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Fehler beim Senden der E-Mail.";
      setFeedback({ type: "error", message: msg });
    } finally {
      setTimeout(() => isSubmitting = false, 1200);
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10">
      <Title
        title="Passwort zuruecksetzen"
        subtitle="Wir schicken dir einen Link zum Zuruecksetzen deines Passworts."
      />

      <form onSubmit={handleSubmit} className={`${panelClass} w-full max-w-md space-y-6`}>
        <BaseInputEmail
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          isDisabled={isSubmitting}
          hint={"Wir senden dir einen Link zum Zurücksetzen."}
        />

        <BaseSubmitButton isLoading={isSubmitting} loadingText={"Sende…"}>
          Link anfordern
        </BaseSubmitButton>

        {feedback ? (
          <Alert status={feedback.type === "success" ? "success" : "error"} borderRadius="lg">
            <AlertIcon />
            {feedback.message}
          </Alert>
        ) : null}
      </form>

      <ButtonRouterLogin variant="ghost" size="sm" className="w-full max-w-md" />

    </section>
  );
}
