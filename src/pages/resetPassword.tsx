import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SmallCard } from '../components/layout/SmallCard';
import { PageHeader } from '../components/layout/PageHeader';
import { PasswordLabel } from '../components/label/PasswordLabel';
import { PasswordRepeatLabel } from '../components/label/PasswordRepeatLabel';
import { RegisterButton } from "../components/button/RegisterButton";
import { TransparentCard } from "../components/layout/TransparentCard";
import { ErrorHelper } from "../helper/errorHelper.js";
import { fetchOne as fetchUser, updateOne as updateUser } from "../repositories/user";
import { ToLoginButton } from "../components/button/ToLoginButton";
import { ToRegisterButton } from "../components/button/ToRegisterButton";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const email = params.get("email");


  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const disabled = !passwordOne || !passwordTwo;

  async function onClickReset() {
    if (!email) {
      globalThis.notify.error(globalThis.t("error.notProvided", [globalThis.t("core.email")]));
      return;
    }

    if (!passwordOne || !passwordTwo) {
      globalThis.notify.error(globalThis.t("error.notProvided", [globalThis.t("core.password")]));
      return;
    }

    if (passwordOne !== passwordTwo) {
      globalThis.notify.error(globalThis.t("message.passwordNotEqual"));
      return;
    }

    try {
      const user = await fetchUser({ where: { email } });
      if (!user) {
        globalThis.notify.error(globalThis.t("error.notFound", [globalThis.t("core.user")]));
        return;
      };

      await updateUser(user.id, { password_hash: passwordTwo });
      globalThis.notify.success(globalThis.t("message.passwordReseted"));

      setTimeout(() => navigate('/login'), 2500);

    } catch (error) {
      ErrorHelper.handleError(error)
    }
  }

  return (
    <section className="reset-password-page pt-20">
      <SmallCard>
        <PageHeader title={globalThis.t("page.resetPassword.title")} info={globalThis.t("page.resetPassword.info")} />
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



