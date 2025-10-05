import BaseButton from "./BaseButton.jsx";

export default function ButtonRegister(props) {
  return (
    <BaseButton variant="secondary" type="submit" {...props}>
      Konto erstellen
    </BaseButton>
  );
}
