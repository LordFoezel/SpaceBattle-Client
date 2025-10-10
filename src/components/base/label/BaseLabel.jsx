import { cn } from "../../../helper/classNames.js";
import { BaseCard } from "../layout/BaseCard.jsx";
import { BaseText } from "../text/BaseText.jsx";

const BaseLabel = function BaseLabel({
    label = "",
    info = "",
    direction = "vertival", // horizontal, vertival
    style = "transparent", // transparent, dark, medium, light 
    variant = "dark", // transparent, dark, medium, light 
    children,
}) {

    function className() {
        const classes = ["flex", `gap-${gap}`, `p-${padding}`, `m-${margin}`, "rounded-md", `justify-${justify}`];
        return classes.join(" ");
    }

    if (direction === "vertival") {
        return (
            <BaseCard direction="col" margin="0" padding="0" variant={variant} style={style}>
                <BaseText uppercase fontSize="lg">{label}</BaseText>
                {children}
                <BaseText fontSize="xs" color="red-100">{info}</BaseText>
            </BaseCard >
        );
    } else {
        return (
            <BaseCard direction="row" style={style} padding="0" justify="sta" variant={variant}>
                {children}
                <BaseCard direction="col" padding="0" margin="0" style={style} variant={variant}>
                    <BaseText uppercase fontSize="lg">{label}</BaseText>
                    <BaseText fontSize="xs">{info}</BaseText>
                </BaseCard>
            </BaseCard>
        );
    }
};

export { BaseLabel };
