import { BaseCard } from "../base/layout/BaseCard";

const SmallCard = function SmallCard({
  children,
}) {

  return (
    <BaseCard direction="col" variant='medium'>
      {children}
    </BaseCard>
  );
};

export { SmallCard };
