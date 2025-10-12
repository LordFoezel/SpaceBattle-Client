import { useNavigate } from "react-router-dom";
import { BaseInputEmail } from "../components/base/input/BaseInputEmail.jsx";
import { Alert, AlertIcon, FormControl, FormLabel, FormHelperText } from "@chakra-ui/react";
import { requestPasswordResetEmail } from "../repositories/auth.ts";
import { useEffect, useState } from "react";
import { login as loginRequest } from "../repositories/auth.ts";
import { requestVerificationEmail } from "../repositories/auth.ts";
import { SmallCard } from '../components/layout/SmallCard.jsx';
import { PageHeader } from '../components/layout/PageHeader.jsx';
import { PasswordLabel } from '../components/label/PasswordLabel.jsx';
import { PasswordRepeatLabel } from '../components/label/PasswordRepeatLabel.jsx';
import { EmailLabel } from '../components/label/EmailLabel.jsx';
import { SendMailForgotPasswordButton } from "../components/button/SendMailForgotPasswordButton.jsx";
import { ToRegisterButton } from "../components/button/ToRegisterButton.jsx";
import { ToLoginButton } from "../components/button/ToLoginButton.jsx";
import { TransparentCard } from "../components/layout/TransparentCard.jsx";
import { ErrorHelper } from "../helper/errorHelper.js";

export default function ForgotPasswordPage() {
  // const [feedback, setFeedback] = useState(null);
  // const [status, setStatus] = useState("idle");
  // const navigate = useNavigate();
  // const isSubmitting = status === "loading";

  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   setStatus("loading");
  //   setFeedback(null);
  //   try {
  //     const formData = new FormData(event.currentTarget);
  //     const email = String(formData.get("email") || "").trim();
  //     if (!email) {
  //       throw new Error("Bitte E-Mail-Adresse eingeben.");
  //     }
  //     await requestPasswordResetEmail({ email });
  //     setFeedback({
  //       type: "success",
  //       message: "Wenn ein Account existiert, senden wir dir in Kürze eine E-Mail.",
  //     });
  //     try { (event.currentTarget).reset(); } catch { }
  //     setStatus("success");
  //   } catch (err) {
  //     const msg = err instanceof Error ? err.message : "Fehler beim Senden der E-Mail.";
  //     setFeedback({ type: "error", message: msg });
  //     setStatus("error");
  //   } finally {
  //     /* no-op */
  //   }
  // }
  // const [passwordOne, setPasswordOne] = useState("");
  // const [passwordTwo, setPasswordTwo] = useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useState(() => {
    try {
      return window.localStorage.getItem("spacebattle.default_email") || "";
    } catch {
      return "";
    }
  });

  async function onClickSendMail() {
    if (!email) {
      notify.warning(t("message.noEmail"));
      return;
    }

    try {
      await requestPasswordResetEmail({ email });
      notify.info(t("message.resetPasswordSent"));

      setTimeout(() => navigate("/login", { replace: true }), 2500);

    } catch (error) {
      ErrorHelper.handleError(error);
      setEmail("");
    }
  }

  // function onClickLogin() {
  //   navigate("/login")
  // }

  // function onClickRegister() {
  //   navigate("/register")
  // }

  return (
    <section className="password-forgot-page pt-20">
      <SmallCard>
        <PageHeader title={t("page.passwordForgot.title")} info={t("page.passwordForgot.info")} />
        <EmailLabel value={email} onChange={(e) => setEmail(e.target.value)} />
        <TransparentCard direction="col">
          <SendMailForgotPasswordButton onClick={onClickSendMail} />
          <TransparentCard direction="row">
            <ToLoginButton />
            <ToRegisterButton />
          </TransparentCard>
        </TransparentCard>
      </SmallCard>
    </section>
  );
}
