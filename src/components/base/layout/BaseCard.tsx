import type { ReactNode } from "react";
import colors from "../../../theme/colors.js";

type Direction = 'row' | 'col';
type Variant = 'transparent' | 'dark' | 'medium' | 'light' | 'bright';

interface BaseCardProps {
  name?: string;
  direction?: Direction;
  gap?: string;
  padding?: string;
  margin?: string;
  variant?: Variant;
  children?: ReactNode;
  justify?: string;
  items?: string;
  width?: string;
  height?: string;
  className?: string;
  [key: string]: any;
}

const BaseCard = function BaseCard({
  name,
  direction,
  gap,
  padding,
  margin,
  variant = "transparent",
  children,
  justify,
  items,
  width = "full",
  height,
  className: extraClass,
}: BaseCardProps) {

  function buildClassName() {
    const classes: string[] = [];
    if (name) classes.push(name);
    if (direction) classes.push(`flex flex-${direction}`);
    if (gap) classes.push(`gap-${gap}`);
    if (padding) classes.push(`p-${padding}`);
    if (margin) classes.push(`m-${margin}`);
    if (items) classes.push(`items-${items}`);
    if (justify) classes.push(`justify-${justify}`);
    if (width) classes.push(`w-${width}`);
    if (height) classes.push(`h-${height}`);
    classes.push("rounded-md");
    if (extraClass) classes.push(extraClass);
    return classes.join(" ");
  }

  const variantStyles: Record<Variant, any> = {
    transparent: {
      backgroundColor: "transparent",
      border: "none",
    },
    dark: {
      backgroundColor: colors.background,
      color: colors.text,
    },
    medium: {
      backgroundColor: colors.surface,
      color: colors.text,
    },
    light: {
      backgroundColor: colors.borderSubtle,
      color: colors.text,
    },
    bright: {
      backgroundColor: colors.border,
      color: colors.surface,
    },
  };

  return (
    <div className={buildClassName()} style={variantStyles[variant]}>{children}</div>
  );
};

export { BaseCard };
