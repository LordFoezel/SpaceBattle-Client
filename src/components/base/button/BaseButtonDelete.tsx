import { BaseButton } from "./BaseButton";
import { IconCross } from "../../icon/IconCross";

interface ButtonProps {
  isDisabled?: boolean;
  id: number;
  onClick?: (id: number) => void;
  height?: number | string;
  width?: string;
  className?: string;
}

const BaseButtonDelete = function BaseButtonDelete({
  isDisabled = false,
  id,
  height,
  width,
  className,
  onClick,
}: ButtonProps) {

  const handleClick = () => {
    onClick?.(id);
  };

  return (
    <BaseButton
      name="delete"
      onClick={handleClick}
      isDisabled={isDisabled}
      size="sm"
      height={height}
      width={width}
      className={className}
      colorScheme="red"
    >
      <IconCross />
    </BaseButton>
  );
};

export { BaseButtonDelete };


