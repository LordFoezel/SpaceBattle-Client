export interface SelectOption {
  name: string;
  label: string;
  parent?: string | null;
  selectable: boolean;
  value: string;
}

export interface SelectOptionRaw {
  name: string;
  label: string;
  parent?: string | null;
  selectable?: boolean;
}

export function adaptSelectOption(raw: SelectOptionRaw): SelectOption {
  const selectable = raw.selectable !== false;
  return {
    name: raw.name,
    label: raw.label,
    parent: raw.parent ?? null,
    selectable,
    value: raw.name,
  };
}

export function adaptSelectOptions(raw: SelectOptionRaw[] = []): SelectOption[] {
  return raw.map(adaptSelectOption);
}
