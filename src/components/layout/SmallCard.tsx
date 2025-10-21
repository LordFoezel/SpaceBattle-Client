import type { ReactNode } from "react";
import { BaseCard } from "../base/layout/BaseCard";

interface SmallCardProps {
  children?: ReactNode;
  [key: string]: any;
}

const SmallCard = function SmallCard({ children, ...rest }: SmallCardProps) {
  return (
    <BaseCard name="small-card" direction="col" variant='medium' padding="5" margin="5" gap="5" width="96" {...rest}>
      {children}
    </BaseCard>
  );
};

export { SmallCard };

