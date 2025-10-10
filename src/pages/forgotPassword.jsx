import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseInputEmail } from "../components/base/input/BaseInputEmail.jsx";
import { BaseButton } from "../components/base/button/BaseButton.jsx";
import { Alert, AlertIcon, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import Title from "../components/layout/title.jsx";
import { panelClass } from "../styles/theme.js";
import { requestPasswordResetEmail } from "../repositories/auth.ts";

export default function ForgotPasswordPage() {
  const [feedback, setFeedback] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();
  const isSubmitting = status === "loading";

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setFeedback(null);
    try {
      const formData = new FormData(event.currentTarget);
      const email = String(formData.get("email") || "").trim();
      if (!email) {
        throw new Error("Bitte E-Mail-Adresse eingeben.");
      }
      await requestPasswordResetEmail({ email });
      setFeedback({
        type: "success",
        message: "Wenn ein Account existiert, senden wir dir in Kürze eine E-Mail.",
      });
      try { (event.currentTarget).reset(); } catch {}
      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Fehler beim Senden der E-Mail.";
      setFeedback({ type: "error", message: msg });
      setStatus("error");
    } finally {
      /* no-op */
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10">
      <Title
        title="Passwort zuruecksetzen"
        subtitle="Wir schicken dir einen Link zum Zuruecksetzen deines Passworts."
      />

      <form onSubmit={handleSubmit} className={`${panelClass} w-full max-w-md space-y-6`}>
        <FormControl isDisabled={isSubmitting}>
          <FormLabel>{t("login.email")}</FormLabel>
          <BaseInputEmail name="email" placeholder={"dein.name@example.com"} />
          <FormHelperText>Wir senden dir einen Link zum Zurücksetzen.</FormHelperText>
        </FormControl>

        <BaseButton type="submit" colorScheme="blue" isDisabled={isSubmitting}>
          {isSubmitting ? "Sende…" : "Link anfordern"}
        </BaseButton>

        {feedback ? (
          <Alert status={feedback.type === "success" ? "success" : "error"} borderRadius="lg">
            <AlertIcon />
            {feedback.message}
          </Alert>
        ) : null}
      </form>

      <div className="w-full max-w-md">
        <BaseButton variant="ghost" size="sm" onClick={() => navigate("/login")}>
          Zum Login
        </BaseButton>
      </div>

    </section>
  );
}
