
import { BaseText } from "../base/text/BaseText";

const ButtonText = function ButtonText({
    children,
}) {
    return (
        <BaseText fontSize="sm">
           {children}
        </BaseText>
    );
};

export { ButtonText };
