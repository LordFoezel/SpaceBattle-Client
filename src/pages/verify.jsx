import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/layout/title.jsx";
import { panelClass } from "../styles/theme.js";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email");

  useEffect(() => {
    const t = setTimeout(() => navigate("/login", { replace: true }), 3500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10">
      <Title
        title="E-Mail verifiziert"
        subtitle="Danke! Deine E-Mail-Adresse wurde bestätigt."
      />

      <div className={`${panelClass} w-full max-w-md space-y-4`}>
        <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          {email ? `Die Adresse ${email} wurde erfolgreich verifiziert.` : "Deine E-Mail-Adresse wurde erfolgreich verifiziert."}
          {" "}Du wirst gleich zum Login weitergeleitet.
        </p>
      </div>
    </section>
  );
}

