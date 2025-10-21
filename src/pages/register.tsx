import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../repositories/auth";
import { requestVerificationEmail } from "../repositories/auth";
import { SmallCard } from '../components/layout/SmallCard';
import { PageHeader } from '../components/layout/PageHeader';
import { EmailLabel } from '../components/label/EmailLabel';
import { PasswordLabel } from '../components/label/PasswordLabel';
import { NameLabel } from '../components/label/NameLabel';
import { RegisterButton } from "../components/button/RegisterButton";
import { TransparentCard } from "../components/layout/TransparentCard";
import { ErrorHelper } from "../helper/errorHelper.js";
import { ToLoginButton } from "../components/button/ToLoginButton";
import { ToForgotButton } from "../components/button/ToForgotButton";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => {
    try {
      return window.localStorage.getItem("spacebattle.default_email") || "";
    } catch {
      return "";
    }
  });

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const disabled = !email || !password || !name;

  async function onClickRegister() {
    if (!email) {
      globalThis.notify.warning(globalThis.t("error.notProvided", [globalThis.t("core.email")]));
      return;
    }
    if (!password) {
      globalThis.notify.warning(globalThis.t("error.notProvided", [globalThis.t("core.password")]));
      return;
    }
    if (!name) {
      globalThis.notify.warning(globalThis.t("error.notProvided", [globalThis.t("core.name")]));
      return;
    }

    try {
      await registerRequest({
        email,
        password,
        name,
      });
      globalThis.notify.info(globalThis.t("message.registerSuccess"));
      try {
        await requestVerificationEmail({ email });
      } catch(error) { /* ignore */ }
      setTimeout(() => navigate("/login", { replace: true }), 2500);
    } catch (error) {
      const code = await ErrorHelper.handleError(error);
      switch (code) {
        case "ALREADY_EXISTS":
          setEmail("");
          break;
        case "422":
          setEmail("");
          setPassword("");
          break;
        default:
          break
      }
    }
  }

  return (
    <section className="register-page pt-20">
      <SmallCard>
        <PageHeader title={globalThis.t("page.register.title")} info={globalThis.t("page.register.info")} />
        <EmailLabel value={email} onChange={(e) => setEmail(e.target.value)} />
        <NameLabel value={name} onChange={(e) => setName(e.target.value)} />
        <PasswordLabel value={password} onChange={(e) => setPassword(e.target.value)} />
        <TransparentCard direction="col">
          <RegisterButton onClick={onClickRegister} isDisabled={disabled} />
          <TransparentCard direction="row">
            <ToLoginButton />
            <ToForgotButton />
          </TransparentCard>
        </TransparentCard>
      </SmallCard>
    </section>
  );
}



