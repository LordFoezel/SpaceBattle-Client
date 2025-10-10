import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { panelClass } from "../styles/theme.js";
import { fetchOne as fetchUser, updateOne as updateUser } from "../repositories/user.ts";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const email = params.get("email");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function verifyEmail() {
      try {
        if (!email) return;
        const user = await fetchUser({ where: { email } });
        if (!user || cancelled) return;
        if (!user.verified) {
          await updateUser(user.id, { verified: true });
        }
      } catch {
        if (!cancelled) setHasError(true);
      }
    }
    verifyEmail();
    return () => {
      cancelled = true;
    };
  }, [email]);

  useEffect(() => {
    if (hasError) return;
    const t = setTimeout(() => navigate("/login", { replace: true }), 3500);
    return () => clearTimeout(t);
  }, [navigate, hasError]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-10">
      <div className={`${panelClass} w-full max-w-md space-y-4`}>
        {hasError ? (
          <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            verifying goes werong, please contact support at: info.spacebattle@gmail.com
          </p>
        ) : (
          <p className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            {email ? `Die Adresse ${email} wurde erfolgreich verifiziert.` : "Deine E-Mail-Adresse wurde erfolgreich verifiziert."}
            {" "}Du wirst gleich zum Login weitergeleitet.
          </p>
        )}
      </div>
    </section>
  );
}
