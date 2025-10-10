import { Text } from "@chakra-ui/react";
import { cn } from "../../../helper/classNames.js";
import { toChakraColor } from "../../../helper/toChakraColor.js";

const BaseText = function BaseText({
  name, // for forms
  fontSize = "md", // xs, sm, md, lg, xl, 2-7xl
  fontWeight = "normal", // light, normal, medium, semibold, bold
  truncate, // cut on single line
  uppercase = false,
  lowercase = false,
  color = "gray-100", // tailwind color 
  children,
  alligment,
  text, // center
}) {
  function className() {
    const classes = [];
    if (uppercase) classes.push("uppercase");
    if (lowercase) classes.push("lowercase");
    if (alligment) classes.push(`justify-${alligment}`);
    if (text) classes.push(`text-${text}`);
    return classes.join(" ");
  }

  return (
    <Text
      name={name}
      fontSize={fontSize}
      fontWeight={fontWeight}
      truncate={truncate}
      color={toChakraColor(color)}
      className={cn(className())}
    >{children}</Text>
  );
};

export { BaseText };
