import colors from "../../../theme/colors.js";

const BaseCard = function BaseCard({
    name,
    direction, // row, col
    gap,
    padding,
    margin,
    variant = "transparent", // transparent, dark, medium, light  bright
    children,
    justify,
    items,
    width = "full",
    height,
}) {

    function className() {
        const classes = []; 
        if (name) classes.push(name);
        if (direction) classes.push(`flex flex-${direction}`);
        if (gap) classes.push(`gap-${gap}`);
        if (padding) classes.push(`p-${padding}`);
        if (margin) classes.push(`m-${margin}`);
        if (items) classes.push(`items-${items}`);
        if (justify) classes.push(`justify-${justify}`);
        if (width) classes.push(`w-${width}`);
        if (height) classes.push(`h-${height}`);
        classes.push("rounded-md")
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
        <div className={className()} style={variantStyles[variant]} > {children}</div>
    );
};

export { BaseCard };
