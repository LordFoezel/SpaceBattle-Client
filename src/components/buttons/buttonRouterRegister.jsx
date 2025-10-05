import BaseButtonRouter from "./BaseButtonRouter.jsx";

export default function ButtonRouterRegister(props) {
  return (
    <BaseButtonRouter to="/register" variant="secondary" {...props}>
      Zur Registrierung
    </BaseButtonRouter>
  );
}
