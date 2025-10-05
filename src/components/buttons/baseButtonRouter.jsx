import { Link } from "react-router-dom";
import BaseButton from "./BaseButton.jsx";

export default function BaseButtonRouter({ to, children, ...props }) {
  return (
    <BaseButton as={Link} to={to} {...props}>
      {children}
    </BaseButton>
  );
}
