import { forwardRef } from "react";
import { Button } from "@chakra-ui/react";
import { cn } from "../../helper/classNames.js";

const BaseButton = forwardRef(function BaseButton(
  {
    name, // for forms
    children,
    isDisabled = false,
    variant = 'solid', // solid, subtle, surface, outline, ghost, plain
    size = 'md', // xs, sm, md, lg
    colorScheme = "blue", // 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
    onClick,
  }, ref) {

  function buildClassName() {
    const result = [];
    return result.join(" ");
  }

  return (
    <Button
      ref={ref}
      name={name}
      variant={variant}
      isDisabled={isDisabled}
      size={size}
      colorScheme={colorScheme}
      className={cn('w-full', buildClassName())}
      onClick={onClick}
    >{children}</Button>
  );
});

export { BaseButton };
