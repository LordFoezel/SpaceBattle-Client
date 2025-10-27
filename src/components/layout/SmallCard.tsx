import type { ReactNode } from "react";
import { BaseCard } from "../base/layout/BaseCard";
import { isMobile } from "../../helper/isMobile";

interface SmallCardProps {
  children?: ReactNode;
  [key: string]: any;
}

const SmallCard = function SmallCard({ children, ...rest }: SmallCardProps) {
  const width = isMobile() ? "90%" : "96";
  return (
    <BaseCard name="small-card" direction="col" variant='medium' padding="5" margin="5" gap="5" width={width} {...rest}>
      {children}
    </BaseCard>
  );
};

export { SmallCard };

