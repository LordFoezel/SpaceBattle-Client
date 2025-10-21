import type { ReactNode } from "react";
import Background from "./background";
import { BaseCard } from "../base/layout/BaseCard";

interface LayoutProps {
  children?: ReactNode;
  [key: string]: any;
}

export default function Layout({ children, ...rest }: LayoutProps) {
  return (
    <Background>
      <BaseCard name="layout" variant="dark" height="screen" direction="row" justify="center" {...rest}>
        {children}
      </BaseCard>
    </Background>
  );
}


