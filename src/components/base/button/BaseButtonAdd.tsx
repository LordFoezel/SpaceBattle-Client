import { BaseButton } from "./BaseButton";
import { IconPlus } from "../../icon/IconPlus";

interface ButtonProps {
  isDisabled?: boolean;
  onClick?: (id: number) => void;
}

const BaseButtonAdd = function BaseButtonAdd({
  isDisabled = false,
  onClick,
}: ButtonProps) {

  return (
    <BaseButton
      name="add"
      onClick={onClick}
      isDisabled={isDisabled}
      size="sm"
      colorScheme="blue"
    >
      <IconPlus />
    </BaseButton>
  );
};

export { BaseButtonAdd };
