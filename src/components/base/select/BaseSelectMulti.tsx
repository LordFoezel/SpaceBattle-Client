import {
  forwardRef,
  useRef,
  useLayoutEffect,
  useState,
  useMemo,
  type MutableRefObject,
} from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Button,
  MenuDivider,
} from "@chakra-ui/react";
import { cn } from "../../../helper/classNames.js";
import colors from "../../../theme/colors.js";
import type { BaseSelectOption } from "./BaseSelect";

export type BaseSelectMultiValue = string | number;
type BaseSelectMultiValueInput = BaseSelectMultiValue | BaseSelectMultiValue[];

export interface BaseSelectMultiProps {
  name?: string;
  value?: BaseSelectMultiValueInput;
  variant?: "outline" | "subtle" | "flushed";
  size?: "xs" | "sm" | "md" | "lg";
  isDisabled?: boolean;
  placeholder?: string;
  onChange?: (values: string[]) => void;
  options?: BaseSelectOption[];
}

const BaseSelectMulti = forwardRef<HTMLButtonElement, BaseSelectMultiProps>(function BaseSelectMulti(
  {
    name,
    value,
    variant = "outline",
    size = "md",
    isDisabled = false,
    placeholder = "",
    onChange,
    options = [],
  },
  ref
) {
  const className =
    "w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40";
  const hasCategories = Array.isArray(options) && options.some((o) => !!o?.category);
  const categories = hasCategories
    ? Array.from(new Set(options.filter((o) => !!o?.category).map((o) => String(o.category))))
    : [];

  const toArrayOfStrings = (v: BaseSelectMultiValueInput | undefined): string[] => {
    if (v == null) return [];
    return Array.isArray(v) ? v.map(String) : [String(v)];
  };

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const selectedValues = useMemo(
    () => (isControlled ? toArrayOfStrings(value) : internalValue),
    [isControlled, value, internalValue]
  );

  const groupKeys = hasCategories ? ["__ungrouped__", ...categories] : ["__ungrouped__"];
  const groupMap = useMemo(() => {
    const map = new Map<string, BaseSelectOption[]>();
    groupKeys.forEach((key) => {
      const items = options.filter((o) =>
        key === "__ungrouped__" ? !o?.category : String(o?.category) === key
      );
      map.set(key, items);
    });
    return map;
  }, [groupKeys, options]);

  const allOptionsByValue = useMemo(
    () => new Map<string, BaseSelectOption>(options.map((o) => [String(o.value), o])),
    [options]
  );

  const handleGroupChange = (groupKey: string) => (vals: string[] | string) => {
    const changeValues = Array.isArray(vals) ? vals : [vals];
    const groupValues = new Set((groupMap.get(groupKey) || []).map((o) => String(o.value)));
    const rest = selectedValues.filter((v) => !groupValues.has(v));
    const next = [...rest, ...changeValues.map(String)];
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const selectedLabels = selectedValues
    .map((v) => allOptionsByValue.get(String(v))?.label ?? String(v))
    .filter(Boolean);
  const buttonText = selectedLabels.length
    ? `${selectedLabels.slice(0, 2).join(", ")}${
        selectedLabels.length > 2 ? ` +${selectedLabels.length - 2}` : ""
      }`
    : placeholder || "Select";
  const hasSelection = selectedLabels.length > 0;

  const [menuW, setMenuW] = useState<number>();
  const buttonElRef = useRef<HTMLButtonElement | null>(null);
  const setRefs = (node: HTMLButtonElement | null) => {
    buttonElRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref && typeof ref === "object") {
      (ref as MutableRefObject<HTMLButtonElement | null>).current = node;
    }
  };

  useLayoutEffect(() => {
    if (!buttonElRef.current) return;
    const update = () => {
      try {
        const w = buttonElRef.current?.getBoundingClientRect().width;
        if (w && w !== menuW) setMenuW(w);
      } catch {
        // ignore measurement errors
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [menuW]);

  return (
    <>
      {name && <input type="hidden" name={name} value={JSON.stringify(selectedValues)} />}
      <Menu closeOnSelect={false} isLazy>
        <MenuButton
          as={Button}
          ref={setRefs}
          variant={variant}
          size={size}
          isDisabled={isDisabled}
          className={cn(className)}
          bg={colors.surface}
          color={hasSelection ? colors.text : colors.textMuted}
          fontWeight={400}
          borderColor={colors.border}
          _hover={{ bg: colors.surface }}
          _active={{ bg: colors.surface }}
          _focusVisible={{ boxShadow: `0 0 0 2px ${colors.focusRing}`, borderColor: colors.focusBorder }}
          justifyContent="flex-start"
          textAlign="left"
          rightIcon={undefined}
        >
          {buttonText}
        </MenuButton>
        <MenuList
          maxH="240px"
          overflowY="auto"
          bg={colors.surface}
          color={colors.text}
          borderColor={colors.borderSubtle}
          minW="unset"
          w={menuW ? `${menuW}px` : undefined}
        >
          <MenuOptionGroup
            title={undefined}
            type="checkbox"
            value={selectedValues.filter((v) =>
              (groupMap.get("__ungrouped__") || []).some((o) => String(o.value) === v)
            )}
            onChange={handleGroupChange("__ungrouped__")}
            sx={{ ".chakra-menu__group__title": { color: colors.groupTitle } }}
          >
            {(groupMap.get("__ungrouped__") || []).map((opt) => (
              <MenuItemOption
                key={String(opt.value)}
                value={String(opt.value)}
                isDisabled={Boolean(
                  (opt.isDisabled ?? opt.disabled) || opt.selectable === false
                )}
                bg="transparent"
                color={colors.text}
                _hover={{ bg: colors.optionHover }}
                _focus={{ bg: colors.optionHover }}
                _checked={{ bg: colors.optionCheckedBg, color: colors.optionCheckedText }}
                sx={{ "&[data-checked=true] svg": { color: colors.focusBorder } }}
                _disabled={{ color: colors.textMuted, opacity: 1, cursor: "not-allowed" }}
              >
                {opt.label ?? String(opt.value)}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>

          {hasCategories && (groupMap.get("__ungrouped__") || []).length > 0 && <MenuDivider />}

          {hasCategories &&
            categories.map((cat, idx) => (
              <MenuOptionGroup
                key={cat}
                title={cat}
                type="checkbox"
                value={selectedValues.filter((v) =>
                  (groupMap.get(cat) || []).some((o) => String(o.value) === v)
                )}
                onChange={handleGroupChange(cat)}
                sx={{ ".chakra-menu__group__title": { color: colors.groupTitle } }}
              >
                {(groupMap.get(cat) || []).map((opt) => (
                  <MenuItemOption
                    key={String(opt.value)}
                    value={String(opt.value)}
                    isDisabled={Boolean(
                      (opt.isDisabled ?? opt.disabled) || opt.selectable === false
                    )}
                    bg="transparent"
                    color={colors.text}
                    _hover={{ bg: colors.optionHover }}
                    _focus={{ bg: colors.optionHover }}
                    _checked={{ bg: colors.optionCheckedBg, color: colors.optionCheckedText }}
                    sx={{ "&[data-checked=true] svg": { color: colors.focusBorder } }}
                    _disabled={{ color: colors.textMuted, opacity: 1, cursor: "not-allowed" }}
                  >
                    {opt.label ?? String(opt.value)}
                  </MenuItemOption>
                ))}
                {idx < categories.length - 1 && <MenuDivider />}
              </MenuOptionGroup>
            ))}
        </MenuList>
      </Menu>
    </>
  );
});

export { BaseSelectMulti };
