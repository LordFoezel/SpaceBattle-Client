import Background from "./background.jsx";
import { BaseCard } from "../base/layout/BaseCard.jsx";

export default function Layout({ children }) {
  return (
    <Background>
      <BaseCard name="layout" variant="dark" height="screen" direction="row" justify="center">
          {children}
      </BaseCard>
    </Background>
  );
}
