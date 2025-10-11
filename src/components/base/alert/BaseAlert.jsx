import { forwardRef, useState } from "react";
import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";
import { cn } from "../../../helper/classNames.js";
import { BaseText } from "../text/BaseText";
import colors from "../../../theme/colors.js";

const BaseAlert = forwardRef(function BaseAlert(
    {
        state = "info", // 'info' | 'error' | 'warning' | 'success'
        text = "",
        className = "",
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
            className={cn(`allert-${state}`, "rounded-md", className, "flex", "flex-row", "justify-between", "items-center")}
            size="sm"
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
