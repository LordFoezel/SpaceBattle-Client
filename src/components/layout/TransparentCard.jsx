import { BaseCard } from "../base/layout/BaseCard";

const TransparentCard = function TransparentCard({
  padding,
  margin,
  gap,
  direction,
  justify,
  items,
  children,
  width,
  height,
}) {

  return (
    <BaseCard name="transparent-card" direction={direction} variant="transparent" width={width} padding={padding} margin={margin} gap={gap} items={items} justify={justify} height={height}>
      {children}
    </BaseCard>
  );
};

export { TransparentCard };
