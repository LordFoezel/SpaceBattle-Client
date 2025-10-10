import { forwardRef } from "react";
import { Text  } from "@chakra-ui/react";
import { cn } from "../../helper/classNames.js";

const BaseText = forwardRef(function BaseText({
  name, // for forms
  fontSize="md", // xs, sm, md, lg, xl, 2-7xl
  fontWeight="normal", // light, normal, medium, semibold, bold
  truncate, // cut on single line
  uppercase=false,
  lowercase=false,
  color="text-gray-100", // tailwind color
  children,
}, ref) {


  function className() {
    const classes = [color];
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
      className={cn(className())}
    >{ children }</Text>
  );
});

export { BaseText };
