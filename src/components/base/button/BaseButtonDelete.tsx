import { BaseButton } from "./BaseButton";
import { IconCross } from "../../icon/IconCross";

interface ButtonProps {
  isDisabled?: boolean;
  id: number;
  onClick?: (id: number) => void;
}

const BaseButtonDelete = function BaseButtonDelete({
  isDisabled = false,
  id,
  onClick,
}: ButtonProps) {

  const handleClick = () => {
    onClick(id);
  };

  return (
    <BaseButton
      name="delete"
      onClick={handleClick}
      isDisabled={isDisabled}
      size="sm"
      height="4"
      colorScheme="red"
    >
      <IconCross />
    </BaseButton>
  );
};

export { BaseButtonDelete };



