import { BaseLabel } from "../base/label/BaseLabel";
import { BaseInputNumber } from "../base/input/BaseInputNumber";

interface DimensionLabelProps {
  value?: number;
  defaultValue?: number;
  onChange?: (e: any) => any;
  onBlur?: (e: any) => any;
}

const DimensionLabel = function DimensionLabel({
  value,
  defaultValue = 1,
  onChange,
  onBlur,
}: DimensionLabelProps) {

  return (
    <BaseLabel variant="transparent"
      label={globalThis.t("admin.dimension.label")}
      info={globalThis.t("admin.dimension.info")}
    >
      <BaseInputNumber
        name="dimension"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        min={1}
      />
    </BaseLabel>
  );
};

export { DimensionLabel };
