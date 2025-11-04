import { Divider } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { toChakraColor } from "../../../helper/toChakraColor.js";

type Orientation = 'horizontal' | 'vertical';
type Variant = 'solid' | 'dashed' | 'dotted';
type SizeKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

interface BaseSeparatorProps {
  variant?: Variant;
  size?: SizeKey;
  color?: string; // tailwind-like token e.g. gray-100
  orientation?: Orientation;
  className?: string;
  children?: ReactNode; // not used, but kept for consistency
  [key: string]: any;
}

const THICKNESS: Record<SizeKey, string> = {
  xs: '1px',
  sm: '1px',
  md: '2px',
  lg: '3px',
  xl: '4px',
  '2xl': '6px',
  '3xl': '8px',
  '4xl': '12px',
  '5xl': '16px',
  '6xl': '20px',
  '7xl': '24px',
};

const BaseSeparator = function BaseSeparator({
  variant = 'solid',
  size = 'md',
  color = 'gray-100',
  orientation = 'horizontal',
  className,
  ...rest
}: BaseSeparatorProps) {
  const thickness = THICKNESS[size] ?? THICKNESS['md'];
  const chakraColor = toChakraColor(color);

  const sx = orientation === 'horizontal'
    ? { borderBottomWidth: thickness }
    : { borderRightWidth: thickness, height: '100%' };

  return (
    <Divider
      orientation={orientation}
      borderColor={chakraColor}
      borderStyle={variant}
      className={className}
      sx={sx}
      {...rest}
    />
  );
};

export { BaseSeparator };
