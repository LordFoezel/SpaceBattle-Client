import BaseButton from "./BaseButton.jsx";

export default function ButtonLogin(props) {
  return (
    <BaseButton type="submit" {...props}>
      Log in
    </BaseButton>
  );
}
