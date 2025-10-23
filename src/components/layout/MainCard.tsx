import type { ReactNode } from "react";
import { BaseCard } from "../base/layout/BaseCard";

interface MainCardProps {
  children?: ReactNode;
  height?: string;
}

const MainCard = function MainCard({ height, children }: MainCardProps) {
  return (
    <BaseCard name="main-card" direction="col" variant='medium' padding="5" margin="5" width="90%" gap="5" height={height}>
      {children}
    </BaseCard>
  );
};

export { MainCard };

