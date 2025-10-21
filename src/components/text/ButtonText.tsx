import type { ReactNode } from "react";
import { BaseText } from "../base/text/BaseText";

interface ButtonTextProps {
  children?: ReactNode;
  fontSize?: string;
  color?: string;
  [key: string]: any;
}

const ButtonText = function ButtonText({
  children,
  fontSize = "sm",
  color,
  ...rest
}: ButtonTextProps) {
  return (
    <BaseText fontSize={fontSize} color={color} {...rest}>
      {children}
    </BaseText>
  );
};

export { ButtonText };
