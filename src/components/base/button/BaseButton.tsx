import { forwardRef, type MouseEventHandler, type ReactNode } from "react";
import { Button } from "@chakra-ui/react";

export interface BaseButtonProps {
  name?: string;
  children?: ReactNode;
  isDisabled?: boolean;
  variant?: string; // flexible to match Chakra variants
  size?: "xs" | "sm" | "md" | "lg";
  colorScheme?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  width?: string;
  className?: string;
  [key: string]: any;
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(function BaseButton(
  {
    name,
    children,
    isDisabled = false,
    variant = "solid",
    size = "md",
    colorScheme = "blue",
    type = "button",
    onClick,
    width,
    className,
    ...rest
  },
  ref
) {
  const hasWidthClass =
    typeof className === "string" && /\bw-(?:\S+)/.test(className);
  const widthClass = width ? `w-${width}` : undefined;
  const mergedClassName = [widthClass, className, !widthClass && !hasWidthClass ? "w-full" : undefined]
    .filter(Boolean)
    .join(" ")
    .trim() || undefined;

  return (
    <Button
      ref={ref}
      name={name}
      variant={variant}
      isDisabled={isDisabled}
      size={size}
      colorScheme={colorScheme}
      type={type}
      className={mergedClassName}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Button>
  );
});

export { BaseButton };

