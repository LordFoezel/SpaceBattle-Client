import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SmallCard } from '../components/layout/SmallCard.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { PasswordLabel } from '../components/label/PasswordLabel.jsx';
import { PasswordRepeatLabel } from '../components/label/PasswordRepeatLabel.jsx';
import { RegisterButton } from "../components/button/RegisterButton.jsx";
import { TransparentCard } from "../components/layout/TransparentCard.jsx";
import { ErrorHelper } from "../helper/errorHelper.js";
import { ToLoginButton } from "../components/button/ToLoginButton.jsx";
import { ToRegisterButton } from "../components/button/ToRegisterButton.jsx";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const email = params.get("email");


  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const disabled = !passwordOne || !passwordTwo;

  async function onClickReset() {
    if (!email) {
      notify.error(t("error.notProvided", [t("core.email")]));
      return;
    }

    if (!passwordOne || !passwordTwo) {
      notify.error(t("error.notProvided", [t("core.password")]));
      return;
    }

    if (passwordOne !== passwordTwo) {
      notify.error(t("message.passwordNotEqual"));
      return;
    }

    try {
      const user = await fetchUser({ where: { email } });
      if (!user) {
        notify.error(t("error.notFound", [t("core.user")]));
        return;
      };

      await updateUser(user.id, { password: passwordTwo });
      notify.success(t("message.passwordReseted"));

      setTimeout(() => navigate('/login'), 2500);

    } catch (error) {
      ErrorHelper.handleError(error)
    }
  }

  return (
    <section className="reset-password-page pt-20">
      <SmallCard>
        <PageHeader title={t("page.resetPassword.title")} info={t("page.resetPassword.info")} />
        <PasswordLabel value={passwordOne} onChange={(e) => setPasswordOne(e.target.value)} />
        <PasswordRepeatLabel value={passwordTwo} onChange={(e) => setPasswordTwo(e.target.value)} />
        <TransparentCard direction="col">
          <RegisterButton onClick={onClickReset} isDisabled={disabled} />
          <TransparentCard direction="row">
            <ToLoginButton />
            <ToRegisterButton />
          </TransparentCard>
        </TransparentCard>
      </SmallCard>
    </section>
  );
}
