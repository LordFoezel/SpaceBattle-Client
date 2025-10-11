import { forwardRef, useState } from "react";
import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";
import { BaseText } from "../text/BaseText";
import colors from "../../../theme/colors.js";

const BaseAlert = forwardRef(function BaseAlert(
    {
        state = "info", // 'info' | 'error' | 'warning' | 'success'
        text = "",
    },
    ref
) {
    const palette = colors?.alert?.[state] ?? colors.alert.info;
    const [isOpen, setIsOpen] = useState(true);
    if (!isOpen) return null;
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
            <CloseButton onClick={() => setIsOpen(false)} />
        </Alert>
    );
});

export { BaseAlert };
