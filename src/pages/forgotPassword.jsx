import { useState } from "react";
import BaseInputEmail from "../components/inputs/baseInputEmail.jsx";
import BaseButton from "../components/buttons/BaseButton.jsx";
import Title from "../components/layout/title.jsx";
import { panelClass } from "../styles/theme.js";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email) {
      setFeedback({ type: "error", message: "Bitte E-Mail-Adresse eingeben." });
      return;
    }
    setFeedback({
      type: "success",
      message: "Wenn ein Account existiert, senden wir dir in Kuerze eine E-Mail.",
    });
    setEmail("");
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
          placeholder="dein.name@example.com"
        />

        <BaseButton type="submit" className="w-full">
          Link anfordern
        </BaseButton>

        {feedback ? (
          <p
            className={`rounded-lg border px-3 py-2 text-sm ${
              feedback.type === "success"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                : "border-rose-500/40 bg-rose-500/10 text-rose-200"
            }`}
          >
            {feedback.message}
          </p>
        ) : null}
      </form>
    </section>
  );
}
