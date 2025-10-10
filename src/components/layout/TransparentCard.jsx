import { BaseCard } from "../base/layout/BaseCard";

const TransparentCard = function TransparentCard({
  padding = "0",
  margin = "0",
  gap = "0",
  direction = "col",
  children,
}) {

  return (
    <BaseCard direction={direction} variant="transparent" padding={padding} margin={margin} gap={gap}>
      {children}
    </BaseCard>
  );
};

export { TransparentCard };
