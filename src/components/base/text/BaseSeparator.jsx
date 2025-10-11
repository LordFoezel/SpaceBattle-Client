import { Divider  } from "@chakra-ui/react";
import { cn } from "../../../helper/classNames.js";

const BaseSeparator = function BaseSeparator({
  name, // for forms
  variant="solid", //solid, dashed, dotted
  size="md", // xs, sm, md, lg, xl, 2-7xl
  color="gray-100", // tailwind color 
  orientation="horizontal" // horizonta, vertical
}) {
  // Convert tailwind-like color (e.g., red-500) to Chakra token (red.500)
  function toChakraColor(token) {
    if (!token) return undefined;
    const idx = token.lastIndexOf("-");
    if (idx === -1) return token;
    return token.slice(0, idx) + "." + token.slice(idx + 1);
  }

  return (
    <Divider 
      name={name}
      size={size}
      orientation={orientation}
      borderColor={toChakraColor(color)}
      borderStyle={variant}
    />
  );
};

export { BaseSeparator };
