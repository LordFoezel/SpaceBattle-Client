import { cn } from "../../../helper/classNames.js";
import colors from "../../../theme/colors.js";

const BaseCard = function BaseCard({
    direction = "row", // row, col
    gap = "5",
    padding = "5",
    margin = "5",
    variant = "dark", // transparent, dark, medium, light  bright
    children,
    justify = "around",
    content = "center",
    width = "full",
    height,
}) {

    function className() {
        const classes = ["flex", `flex-${direction}`, `gap-${gap}`, `p-${padding}`, `m-${margin}`, `content-${content}`, "rounded-md", `justify-${justify}`, `w-${width}` ];
        if(height) classes.push(`h-${height}`);
        return classes.join(" ");
    }

    const variantStyles = {
        transparent: {
            backgroundColor: "transparent",
            border: "none",
        },
        dark: {
            backgroundColor: colors.background,
            color: colors.text,
        },
        medium: {
            backgroundColor: colors.surface,
            color: colors.text,
        },
        light: {
            backgroundColor: colors.borderSubtle,
            color: colors.text,
        },
        bright: {
            backgroundColor: colors.border,
            color: colors.surface,
        },
    };

    return (
        <div className={cn(className())
        } style={variantStyles[variant]} > {children}</div>
    );
};

export { BaseCard };
