import { BaseCard } from "../layout/BaseCard.jsx";
import { BaseText } from "../text/BaseText.jsx";

const BaseLabel = function BaseLabel({
    label = "",
    info = "",
    direction = "vertical", // horizontal, vertical
    style = "transparent", // transparent, dark, medium, light 
    variant = "dark", // transparent, dark, medium, light 
    children,
}) {

    if (direction === "vertical") {
        return (
            <BaseCard direction="col" margin="0" padding="0" variant={variant} style={style} gap="2">
                <BaseText fontSize="md">{label}</BaseText>
                {children}
                <BaseText fontSize="xs" color="gray-500">{info}</BaseText>
            </BaseCard >
        );
    } else {
        return (
            <BaseCard direction="row" style={style} margin="0" padding="0" justify="sta" variant={variant}>
                {children}
                <BaseCard direction="col" padding="0" margin="0" gap="0" style={style} variant={variant}>
                    <BaseText fontSize="lg">{label}</BaseText>
                    <BaseText fontSize="xs" color="gray-500">{info}</BaseText>
                </BaseCard>
            </BaseCard>
        );
    }
};

export { BaseLabel };
