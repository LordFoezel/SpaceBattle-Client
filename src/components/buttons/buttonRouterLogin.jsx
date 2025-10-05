import BaseButtonRouter from "./BaseButtonRouter.jsx";

export default function ButtonRouterLogin(props) {
  return (
    <BaseButtonRouter to="/login" {...props}>
      Zur Anmeldung
    </BaseButtonRouter>
  );
}
