import { BaseCard } from "../base/layout/BaseCard";

const SmallCard = function SmallCard({
  children,
}) {

  return (
      <BaseCard name="small-card" direction="col" variant='medium' padding="5" margin="5" gap="3" width="96">
        {children}
    </BaseCard>
  );
};

export { SmallCard };
