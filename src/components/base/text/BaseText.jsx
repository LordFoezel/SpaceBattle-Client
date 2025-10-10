import { forwardRef } from "react";
import { Text  } from "@chakra-ui/react";
import { cn } from "../../../helper/classNames.js";

const BaseText = forwardRef(function BaseText({
  name, // for forms
  fontSize="md", // xs, sm, md, lg, xl, 2-7xl
  fontWeight="normal", // light, normal, medium, semibold, bold
  truncate, // cut on single line
  uppercase=false,
  lowercase=false,
  color="gray-100", // tailwind color 
  children,
}, ref) {
  // Convert tailwind-like color (e.g., red-500) to Chakra token (red.500)
  function toChakraColor(token) {
    if (!token) return undefined;
    const idx = token.lastIndexOf("-");
    if (idx === -1) return token;
    return token.slice(0, idx) + "." + token.slice(idx + 1);
  }

  function className() {
    const classes = [];
    if(uppercase) classes.push("uppercase");
    if(lowercase) classes.push("lowercase");
    return classes.join(" ");
  }

  return (
    <Text 
      ref={ref}
      name={name}
      fontSize={fontSize}
      fontWeight={fontWeight}
      truncate={truncate}
      color={toChakraColor(color)}
      className={cn(className())}
    >{ children }</Text>
  );
});

export { BaseText };
