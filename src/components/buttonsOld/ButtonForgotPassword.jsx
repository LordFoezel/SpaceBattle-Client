import BaseButtonRouter from "./BaseButtonRouter.jsx";

export default function ButtonForgotPassword(props) {
  return (
    <BaseButtonRouter
      to="/forgot-password"
      variant="ghost"
      size="sm"
      {...props}
    >
      Passwort vergessen?
    </BaseButtonRouter>
  );
}
