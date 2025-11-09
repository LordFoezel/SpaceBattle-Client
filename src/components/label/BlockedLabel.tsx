import { BaseLabel } from "../base/label/BaseLabel";
import { BaseCheckbox } from "../base/checkbox/BaseCheckbox";

interface BlockedLabelProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (e: any) => any;
}

const BlockedLabel = function BlockedLabel({
  value,
  defaultValue = false,
  onChange,
}: BlockedLabelProps) {

  return (
    <BaseLabel
      variant="transparent"
      label={globalThis.t("admin.blocked.label")}
      info={globalThis.t("admin.blocked.info")}
      direction="horizontal"
    >
      <BaseCheckbox
        name="blocked"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </BaseLabel>
  );
};

export { BlockedLabel };
