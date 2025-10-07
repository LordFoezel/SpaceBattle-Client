import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BaseInput from "../components/inputs/baseInput.jsx";
import BaseButton from "../components/buttons/BaseButton.jsx";
import Title from "../components/layout/title.jsx";
import { panelClass } from "../styles/theme.js";
import { resetPassword } from "../repositories/auth.ts";

export default function ResetPasswordPage() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const email = useMemo(() => search.get("email") || "", [search]);
  const token = useMemo(() => search.get("token") || undefined, [search]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback(null);

    if (!email) {
      setFeedback({ type: "error", message: "Ungültiger Link: E-Mail fehlt." });
      return;
    }
    if (!password || password.length < 8) {
      setFeedback({ type: "error", message: "Passwort muss mindestens 8 Zeichen haben." });
      return;
    }
    if (password !== confirm) {
      setFeedback({ type: "error", message: "Passwörter stimmen nicht überein." });
      return;
    }

    try {
      setSubmitting(true);
      await resetPassword({ email, password, token });
      setFeedback({ type: "success", message: "Passwort aktualisiert. Du kannst dich jetzt anmelden." });
      setPassword("");
      setConfirm("");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Zurücksetzen fehlgeschlagen.";
      setFeedback({ type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10">
      <Title
        title="Neues Passwort setzen"
        subtitle={email ? `Für ${email}` : "Bitte nutze den Link aus der E‑Mail."}
      />

      <form onSubmit={handleSubmit} className={`${panelClass} w-full max-w-md space-y-6`}>
        <BaseInput
          type="password"
          autoFocus
          label="Neues Passwort"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <BaseInput
          type="password"
          label="Passwort bestätigen"
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <BaseButton type="submit" disabled={submitting} className="w-full">
          {submitting ? "Speichere…" : "Passwort speichern"}
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
