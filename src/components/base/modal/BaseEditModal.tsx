import type { ComponentProps } from "react";
import { BaseModal } from "./BaseModal";
import { IconGear } from "../../icon/IconGear";

type BaseEditModalProps = ComponentProps<typeof BaseModal>;

const BaseEditModal = function BaseEditModal({
  triggerProps,
  children,
  ...rest
}: BaseEditModalProps) {
  const defaultTriggerProps = {
    name: "edit",
    size: "sm",
    colorScheme: "blue",
    width: "10",
    "aria-label": globalThis.t?.("core.edit") ?? "Edit",
  };

  const mergedTriggerProps = {
    ...defaultTriggerProps,
    ...triggerProps,
  };

  return (
    <BaseModal
      triggerChildren={<IconGear />}
      triggerProps={mergedTriggerProps}
      {...rest}
    >
      {children}
    </BaseModal>
  );
};

export { BaseEditModal };
