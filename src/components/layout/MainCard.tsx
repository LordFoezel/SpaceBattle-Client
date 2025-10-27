import type { ReactNode } from "react";
import { BaseCard } from "../base/layout/BaseCard";
import { isMobile } from "../../helper/isMobile";

interface MainCardProps {
  children?: ReactNode;
  height?: string;
}

const MainCard = function MainCard({ height, children }: MainCardProps) {
  const width = isMobile() ? "90%" : "96";
  return (
    <BaseCard name="main-card" direction="col" variant='medium' padding="5" margin="5" width={width} gap="5" height={height}>
      {children}
    </BaseCard>
  );
};

export { MainCard };

