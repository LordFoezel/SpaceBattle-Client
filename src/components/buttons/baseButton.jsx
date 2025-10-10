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
    color = "bg-gray-800", // tailwind color
    colorPalette, // mapped to Chakra colorScheme
    onClick,
  }, ref) {

  function buildClassName() {
    if (!color) return "";
    const tokens = String(color).trim().split(/\s+/).filter(Boolean);
    const result = [];
    let hasTextColor = false;

    for (const t of tokens) {
      const token = t.startsWith("!") ? t : "!" + t;
      result.push(token);

      if (/^!?bg-/.test(t)) {
        const base = t.replace(/^!/, "");
        result.push("!hover:" + base);
      }

      if (/-?text-/.test(t)) hasTextColor = true;
    }

    if (!hasTextColor) result.push("!text-white");

    return result.join(" ");
  }

  return (
    <Button
      ref={ref}
      name={name}
      variant={variant}
      isDisabled={isDisabled}
      size={size}
      colorScheme={colorPalette}
      className={cn('w-full', buildClassName())}
      onClick={onClick}
    >{children}</Button>
  );
});

export { BaseButton };
