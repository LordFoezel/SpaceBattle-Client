import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchOne as fetchUser, updateOne as updateUser } from "../repositories/user.ts";
import { PageHeader } from '../components/layout/PageHeader.jsx';
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
      notify.error(t("error.notProvided", [t("core.email")]));
      return;
    }
    const user = await fetchUser({ where: { email } });
    if (!user) {
      notify.error(t("error.notFound", [t("core.user")]));
      return;
    };

    try {

      await updateUser(user.id, { verified: true });
      notify.success(t("message.emailVerified"));

      setTimeout(() => navigate('/login'), 2500);

    } catch (error) {
      ErrorHelper.handleError(error)
    }
  }

  return (
    <section className="verify-page pt-20">
      <PageHeader title={t("page.verify.title")} info={t("page.verify.info")} />
    </section>
  );
}
