import { BaseCard } from "../base/layout/BaseCard";

const MainCard = function MainCard({
  children,
}) {

  return (
    <BaseCard direction="col" variant='medium'>
      {children}
    </BaseCard>
  );
};

export { MainCard };
