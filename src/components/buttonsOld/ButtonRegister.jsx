import BaseButton from "./BaseButton.jsx";

export default function ButtonRegister(props) {
  return (
    <BaseButton type="submit" {...props}>
      Konto erstellen
    </BaseButton>
  );
}
