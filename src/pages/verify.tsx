import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchOne as fetchUser, updateOne as updateUser } from "../repositories/user";
import { PageHeader } from '../components/layout/PageHeader';
import { ErrorHelper } from "../helper/errorHelper.js";

export default function VerifyPage() {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const email = params.get("email");

  useEffect(() => {
    verifyEmail();
  });

  async function verifyEmail() {
    if (!email) {
      globalThis.notify.error(globalThis.t("error.notProvided", [globalThis.t("core.email")]));
      return;
    }
    const user = await fetchUser({ where: { email } });
    if (!user) {
      globalThis.notify.error(globalThis.t("error.notFound", [globalThis.t("core.user")]));
      return;
    };

    try {

      await updateUser(user.id, { verified: true });
      globalThis.notify.success(globalThis.t("message.emailVerified"));

      setTimeout(() => navigate('/login'), 2500);

    } catch (error) {
      ErrorHelper.handleError(error)
    }
  }

  return (
    <section className="verify-page pt-20">
      <PageHeader title={globalThis.t("page.verify.title")} info={globalThis.t("page.verify.info")} />
    </section>
  );
}



