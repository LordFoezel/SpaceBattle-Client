import { forwardRef } from "react";
import { Button } from "@chakra-ui/react";

const BaseButton = forwardRef(function BaseButton(
  {
    name, // for forms
    children,
    isDisabled = false,
    variant = 'solid', // solid, subtle, surface, outline, ghost, plain
    size = 'md', // xs, sm, md, lg
    colorScheme = "blue", // 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
    type = 'button', // button, submit, reset
    onClick,
  }, ref) {


  return (
    <Button
      ref={ref}
      name={name}
      variant={variant}
      isDisabled={isDisabled}
      size={size}
      colorScheme={colorScheme}
      type={type}
      className='w-full'
      onClick={onClick}
    >{children}</Button>
  );
});

export { BaseButton };
