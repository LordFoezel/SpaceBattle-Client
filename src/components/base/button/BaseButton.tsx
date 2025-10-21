import { forwardRef, type MouseEventHandler, type ReactNode } from "react";
import { Button } from "@chakra-ui/react";

interface BaseButtonProps {
  name?: string;
  children?: ReactNode;
  isDisabled?: boolean;
  variant?: string; // flexible to match Chakra variants
  size?: 'xs' | 'sm' | 'md' | 'lg';
  colorScheme?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  [key: string]: any;
}

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(function BaseButton(
  {
    name,
    children,
    isDisabled = false,
    variant = 'solid',
    size = 'md',
    colorScheme = 'blue',
    type = 'button',
    onClick,
    ...rest
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
      {...rest}
    >{children}</Button>
  );
});

export { BaseButton };

