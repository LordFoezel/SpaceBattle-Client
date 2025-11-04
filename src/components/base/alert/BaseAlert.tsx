import { forwardRef, useState } from "react";
import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";
import { BaseText } from "../text/BaseText";
import colors from "../../../theme/colors.js";

type AlertState = "info" | "error" | "warning" | "success";

interface BaseAlertProps {
  state?: AlertState;
  text?: string;
  isClosable?: boolean;
  onClose?: () => void;
}

const BaseAlert = forwardRef<HTMLDivElement, BaseAlertProps>(function BaseAlert(
  { state = "info", text = "", isClosable = true, onClose },
  ref
) {
  const palette = colors?.alert?.[state] ?? colors.alert.info;
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <Alert
      status={state}
      ref={ref}
      variant="subtle"
      className={`allert-${state} rounded-md flex flex-row justify-between items-center h-5`}
      sx={{
        bg: palette.bg,
        color: palette.text,
        borderWidth: "1px",
        borderColor: palette.border,
      }}
    >
      <AlertIcon />
      <BaseText fontSize="xs">{text}</BaseText>
      {isClosable && <CloseButton onClick={handleClose} />}
    </Alert>
  );
});

export { BaseAlert };
export type { BaseAlertProps };
