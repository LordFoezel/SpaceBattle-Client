import { forwardRef } from "react";
import { Checkbox } from "@chakra-ui/react";
import { cn } from "../../../helper/classNames.js";
import colors from "../../../theme/colors.js";

const BaseCheckbox = forwardRef(function BaseCheckbox(
    {
        name, // for forms
        value,
        isDisabled = false,
        variant = 'solid', // solid, subtle,  outline
        size = 'md', // xs, sm, md, lg
        onClick,
        onChange,
    }, ref) {

    function buildClassName() {
        const result = [];
        return result.join(" ");
    }

    const hasHandler = typeof onChange === 'function' || typeof onClick === 'function';
    const isControlled = hasHandler && value !== undefined && value !== null;
    const toBool = (v) => {
        if (typeof v === 'string') {
            const s = v.toLowerCase();
            if (s === '0' || s === 'false' || s === 'off') return false;
            if (s === '1' || s === 'true' || s === 'on') return true;
        }
        return !!v;
    };
    const checkedProps = isControlled
        ? { isChecked: toBool(value) }
        : (value !== undefined && value !== null ? { defaultChecked: toBool(value) } : {});

    const handleChange = (e) => {
        if (typeof onChange === 'function') onChange(e);
        if (typeof onClick === 'function') onClick(e);
    };

    return (
        <Checkbox
            ref={ref}
            {...checkedProps}
            name={name}
            variant={variant}
            isDisabled={isDisabled}
            size={size}
            className={cn(buildClassName())}
            iconColor={colors.optionCheckedText}
            color={colors.text}
            sx={{
                '.chakra-checkbox__control': {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                },
                '.chakra-checkbox__control[data-checked]': {
                    backgroundColor: colors.optionCheckedBg,
                    borderColor: colors.optionCheckedBg,
                },
                '.chakra-checkbox__label': {
                    color: colors.text,
                },
            }}
            onChange={handleChange}
        />
    );
});

export { BaseCheckbox };
