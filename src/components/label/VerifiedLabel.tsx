import { BaseLabel } from "../base/label/BaseLabel";
import { BaseCheckbox } from "../base/checkbox/BaseCheckbox";

interface VerifiedLabelProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (e: any) => any;
}

const VerifiedLabel = function VerifiedLabel({
  value,
  defaultValue = false,
  onChange,
}: VerifiedLabelProps) {

  return (
    <BaseLabel
      variant="transparent"
      label={globalThis.t("admin.verified.label")} info={globalThis.t("admin.verified.info")}
      direction="horizontal"
    >
      <BaseCheckbox
        name="verified"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </BaseLabel>
  );
};

export { VerifiedLabel };
