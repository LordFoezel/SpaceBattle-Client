import Background from "./background.jsx";
import { BaseCard } from "../base/layout/BaseCard.jsx";

export default function Layout({ children }) {
  return (
    <Background>
      <BaseCard variant="dark" padding="0" margin="0" height="screen" content="center">
          {children}
      </BaseCard>
    </Background>
  );
}
