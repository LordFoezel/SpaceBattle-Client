import { BaseCard } from "../base/layout/BaseCard";

const MainCard = function MainCard({
  children,
}) {

  return (
    <BaseCard name="main-card" direction="col" variant='medium' padding="5" margin="5" width="96" gap="5">
      {children}
    </BaseCard>
  );
};

export { MainCard };
