export interface SelectOption {
  label: string;
  parent?: string | null;
  selectable: boolean;
  value: string;
}

export interface SelectOptionRaw {
  label: string;
  value: string;
  parent?: string | null;
  selectable?: boolean;
}

export function adaptSelectOption(raw: SelectOptionRaw): SelectOption {
  const selectable = raw.selectable !== false;
  return {
    label: raw.label,
    parent: raw.parent ?? null,
    selectable,
    value: raw.value,
  };
}

export function adaptSelectOptions(raw: SelectOptionRaw[] = []): SelectOption[] {
  return raw.map(adaptSelectOption);
}
