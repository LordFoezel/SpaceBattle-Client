import { BaseLabel } from "../base/label/BaseLabel";
import { BaseSelect } from "../base/select/BaseSelect";
import type { SelectOption } from "../../models/selectOption";

interface RoleLabelProps {
  value?: string;
  onChange?: (e: any) => any;
}

const RoleLabel = function RoleLabel({
  value,
  onChange,
}: RoleLabelProps) {

  const options: SelectOption[] = [
    {
      value: "admin",
      label: globalThis.t("role.admin"),
      selectable: true,
    },
    {
      value: "player",
      label: globalThis.t("role.player"),
      selectable: true,
    },
  ];

  return (
    <BaseLabel variant="transparent" label={globalThis.t("admin.role.label")} info={globalThis.t("admin.role.info")}>
      <BaseSelect options={options} value={value}
        onChange={onChange} />
    </BaseLabel>
  );
};

export { RoleLabel };
