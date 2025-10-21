import type { ReactNode } from "react";
import { BaseCard } from "../base/layout/BaseCard";

interface MainCardProps {
  children?: ReactNode;
  [key: string]: any;
}

const MainCard = function MainCard({ children, ...rest }: MainCardProps) {
  return (
    <BaseCard name="main-card" direction="col" variant='medium' padding="5" margin="5" width="96" gap="5" {...rest}>
      {children}
    </BaseCard>
  );
};

export { MainCard };

