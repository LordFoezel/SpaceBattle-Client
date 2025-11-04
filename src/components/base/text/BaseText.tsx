import { Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { toChakraColor } from "../../../helper/toChakraColor.js";

interface BaseTextProps {
  fontSize?: string;
  fontWeight?: string;
  truncate?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  color?: string;
  children?: ReactNode;
  alligment?: string;
  text?: string;
}

const BaseText = function BaseText({
  fontSize = "md",
  fontWeight = "light",
  truncate,
  uppercase = false,
  lowercase = false,
  color = "gray-100",
  children,
  alligment,
  text,
}: BaseTextProps) {
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
      fontSize={fontSize}
      fontWeight={fontWeight}
      isTruncated={truncate}
      color={toChakraColor(color)}
      className={className()}
    >{children}</Text>
  );
};

export { BaseText };
