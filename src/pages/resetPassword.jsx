import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { panelClass } from "../styles/theme.js";
import { resetPassword } from "../repositories/auth.ts";
import { BaseInputPassword } from "../components/base/input/BaseInputPassword.jsx";
import { BaseButton } from "../components/base/button/BaseButton.jsx";
import { Alert, AlertIcon, FormControl, FormLabel } from "@chakra-ui/react";

export default function ResetPasswordPage() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const email = useMemo(() => search.get("email") || "", [search]);
  const token = useMemo(() => search.get("token") || undefined, [search]);

  const [feedback, setFeedback] = useState(null);
  const [status, setStatus] = useState("idle");
  const isSubmitting = status === "loading";

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback(null);
    setStatus("loading");

    try {
      if (!email) {
        throw new Error("Ungültiger Link: E-Mail fehlt.");
      }

      const data = new FormData(e.currentTarget);
      const password = String(data.get("password") || "");
      const confirm = String(data.get("confirm") || "");

      if (!password || password.length < 8) {
        throw new Error("Passwort muss mindestens 8 Zeichen haben.");
      }
      if (password !== confirm) {
        throw new Error("Passwörter stimmen nicht überein.");
      }

      await resetPassword({ email, password, token });
      setFeedback({ type: "success", message: "Passwort aktualisiert. Du kannst dich jetzt anmelden." });
      try { (e.currentTarget).reset(); } catch {}
      setStatus("success");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Zurücksetzen fehlgeschlagen.";
      setFeedback({ type: "error", message: msg });
      setStatus("error");
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10">
      <form onSubmit={handleSubmit} className={`${panelClass} w-full max-w-md space-y-6`}>
        <FormControl isDisabled={isSubmitting}>
          <FormLabel>Neues Passwort</FormLabel>
          <BaseInputPassword name="password" autoComplete="new-password" placeholder={"••••••••"} />
        </FormControl>
        <FormControl isDisabled={isSubmitting}>
          <FormLabel>Passwort bestätigen</FormLabel>
          <BaseInputPassword name="confirm" autoComplete="new-password" placeholder={"••••••••"} />
        </FormControl>
        <BaseButton type="submit" colorScheme="blue" isDisabled={isSubmitting}>
          {isSubmitting ? "Speichere…" : "Passwort speichern"}
        </BaseButton>

        {feedback ? (
          <Alert status={feedback.type === "success" ? "success" : "error"} borderRadius="lg">
            <AlertIcon />
            {feedback.message}
          </Alert>
        ) : null}
      </form>
    </section>
  );
}
