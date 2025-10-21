import type { ReactNode } from "react";
import { BaseCard } from "../base/layout/BaseCard";

interface TransparentCardProps {
  padding?: string;
  margin?: string;
  gap?: string;
  direction?: 'row' | 'col';
  justify?: string;
  items?: string;
  children?: ReactNode;
  width?: string;
  height?: string;
  [key: string]: any;
}

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
  ...rest
}: TransparentCardProps) {
  return (
    <BaseCard name="transparent-card" direction={direction} variant="transparent" width={width} padding={padding} margin={margin} gap={gap} items={items} justify={justify} height={height} {...rest}>
      {children}
    </BaseCard>
  );
};

export { TransparentCard };

