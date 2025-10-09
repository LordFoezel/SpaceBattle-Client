import { forwardRef } from "react";
import { Button } from "@chakra-ui/react";

const BaseSubmitButton = forwardRef(function BaseSubmitButton({
  children,
  isLoading,
  loadingText,
  colorScheme = "blue",
  width = "100%",
  ...props
}, ref) {
  return (
    <Button
      ref={ref}
      type="submit"
      colorScheme={colorScheme}
      width={width}
      isLoading={isLoading}
      loadingText={loadingText}
      {...props}
    >
      {children}
    </Button>
  );
});

export default BaseSubmitButton;

