import { BaseButton } from "./BaseButton";
import { IconGear } from "../../icon/IconGear";

interface ButtonProps {
  isDisabled?: boolean;
  onClick?: (id: number) => void;
}

const BaseButtonEdit = function BaseButtonEdit({
  isDisabled = false,
  onClick,
}: ButtonProps) {

  return (
    <BaseButton
      name="edit"
      onClick={onClick}
      isDisabled={isDisabled}
      size="sm"
      colorScheme="blue"
    >
      <IconGear />
    </BaseButton>
  );
};

export { BaseButtonEdit };
