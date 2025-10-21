import type { ReactNode } from "react";
import { BaseCard } from "../layout/BaseCard";
import { BaseText } from "../text/BaseText";

type Direction = "horizontal" | "vertical";
type StyleVariant = "transparent" | "dark" | "medium" | "light";

interface BaseLabelProps {
  label?: string;
  info?: string;
  direction?: Direction;
  style?: StyleVariant;
  variant?: StyleVariant;
  children?: ReactNode;
  [key: string]: any;
}

const BaseLabel = function BaseLabel({
  label = "",
  info = "",
  direction = "vertical",
  style = "transparent",
  variant = "dark",
  children,
  ...rest
}: BaseLabelProps) {

  if (direction === "vertical") {
    return (
      <BaseCard direction="col" margin="0" padding="0" variant={variant} style={style} gap="2" {...rest}>
        <BaseText fontSize="md">{label}</BaseText>
        {children}
        <BaseText fontSize="xs" color="gray-500">{info}</BaseText>
      </BaseCard>
    );
  } else {
    return (
      <BaseCard direction="row" style={style} margin="0" padding="0" justify="sta" variant={variant} {...rest}>
        {children}
        <BaseCard direction="col" padding="0" margin="0" gap="0" style={style} variant={variant}>
          <BaseText fontSize="lg">{label}</BaseText>
          <BaseText fontSize="xs" color="gray-500">{info}</BaseText>
        </BaseCard>
      </BaseCard>
    );
  }
};

export { BaseLabel };


