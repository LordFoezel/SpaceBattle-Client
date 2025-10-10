import { forwardRef, useRef, useLayoutEffect, useState, useMemo } from "react";
import { Menu, MenuButton, MenuList, MenuOptionGroup, MenuItemOption, Button, MenuDivider } from "@chakra-ui/react";
import { cn } from "../../helper/classNames.js";

const BaseSelectMulti = forwardRef(function BaseSelectMulti({
  name, // for forms
  value,
  variant = 'outline', // outline, subtle, flushed
  size = 'md', // xs, sm, md, lg
  isDisabled = false,  
  placeholder = '',
  onChange,
  options=[], // SelectOption[]
}, ref) {


  const className = "w-full rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40";
  const hasCategories = Array.isArray(options) && options.some(o => !!o?.category);
  const categories = hasCategories
    ? Array.from(new Set(options.filter(o => !!o?.category).map(o => o.category)))
    : [];
  const toArrayOfStrings = (v) => (Array.isArray(v) ? v.map(String) : (v == null ? [] : [String(v)]));
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState([]);
  const selectedValues = useMemo(() => (isControlled ? toArrayOfStrings(value) : internalValue), [isControlled, value, internalValue]);

  const groupKeys = hasCategories ? ["__ungrouped__", ...categories.map(String)] : ["__ungrouped__"];
  const groupMap = new Map(
    groupKeys.map((g) => [
      g,
      options.filter((o) => (g === "__ungrouped__" ? !o?.category : String(o?.category) === g)),
    ])
  );

  const allOptionsByValue = new Map(options.map((o) => [String(o.value), o]));

  const handleGroupChange = (groupKey) => (vals) => {
    const groupValues = new Set((groupMap.get(groupKey) || []).map((o) => String(o.value)));
    const rest = selectedValues.filter((v) => !groupValues.has(v));
    const next = [...rest, ...vals.map(String)];
    if (!isControlled) setInternalValue(next);
    if (onChange) onChange(next);
  };

  const selectedLabels = selectedValues
    .map((v) => allOptionsByValue.get(String(v))?.label ?? String(v))
    .filter(Boolean);
  const buttonText = selectedLabels.length
    ? selectedLabels.slice(0, 2).join(", ") + (selectedLabels.length > 2 ? ` +${selectedLabels.length - 2}` : "")
    : (placeholder || "Select");
  const hasSelection = selectedLabels.length > 0;

  const [menuW, setMenuW] = useState();
  const buttonElRef = useRef(null);
  const setRefs = (node) => {
    buttonElRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useLayoutEffect(() => {
    if (!buttonElRef.current) return;
    const update = () => {
      try {
        const w = buttonElRef.current.getBoundingClientRect().width;
        if (w && w !== menuW) setMenuW(w);
      } catch {}
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [menuW]);

  return (
    <>
      {name && (
        <input type="hidden" name={name} value={JSON.stringify(selectedValues)} />
      )}
      <Menu closeOnSelect={false} isLazy>
        <MenuButton
          as={Button}
          ref={setRefs}
          variant={variant}
          size={size}
          isDisabled={isDisabled}
          className={cn(className)}
          bg="#0f172a"
          color={hasSelection ? "#f1f5f9" : "#64748b"}
          fontWeight={400}
          borderColor="#cbd5e1"
          _hover={{ bg: "#0f172a" }}
          _active={{ bg: "#0f172a" }}
          _focusVisible={{ boxShadow: "0 0 0 2px rgba(56,189,248,0.4)", borderColor: "#38bdf8" }}
          justifyContent="flex-start"
          textAlign="left"
          rightIcon={undefined}
        >
          {buttonText}
        </MenuButton>
        <MenuList
          maxH="240px"
          overflowY="auto"
          bg="#0f172a"
          color="#f1f5f9"
          borderColor="#1e293b"
          minW="unset"
          w={menuW ? `${menuW}px` : undefined}
        >
          {/* Ungrouped first */}
          <MenuOptionGroup
            title={undefined}
            type="checkbox"
            value={selectedValues.filter((v) => (groupMap.get("__ungrouped__") || []).some((o) => String(o.value) === String(v)))}
            onChange={handleGroupChange("__ungrouped__")}
            sx={{ '.chakra-menu__group__title': { color: '#cbd5e1' } }}
          >
            {(groupMap.get("__ungrouped__") || []).map((opt) => (
              <MenuItemOption
                key={String(opt.value)}
                value={String(opt.value)}
                isDisabled={Boolean((opt.isDisabled ?? opt.disabled) || opt.selectable === false)}
                bg="transparent"
                color="#f1f5f9"
                _hover={{ bg: '#2563eb' }}
                _focus={{ bg: '#2563eb' }}
                _checked={{ bg: '#075985', color: '#f8fafc' }}
                sx={{ '&[data-checked=true] svg': { color: '#38bdf8' } }}
                _disabled={{ color: '#64748b', opacity: 1, cursor: 'not-allowed' }}
              >
                {opt.label ?? String(opt.value)}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>

          {hasCategories && (groupMap.get("__ungrouped__") || []).length > 0 && <MenuDivider />}

          {hasCategories && categories.map((cat, idx) => (
            <MenuOptionGroup
              key={String(cat)}
              title={String(cat)}
              type="checkbox"
              value={selectedValues.filter((v) => (groupMap.get(String(cat)) || []).some((o) => String(o.value) === String(v)))}
              onChange={handleGroupChange(String(cat))}
              sx={{ '.chakra-menu__group__title': { color: '#cbd5e1' } }}
            >
              {(groupMap.get(String(cat)) || []).map((opt) => (
                <MenuItemOption
                  key={String(opt.value)}
                  value={String(opt.value)}
                  isDisabled={Boolean((opt.isDisabled ?? opt.disabled) || opt.selectable === false)}
                  bg="transparent"
                  color="#f1f5f9"
                  _hover={{ bg: '#2563eb' }}
                  _focus={{ bg: '#2563eb' }}
                  _checked={{ bg: '#075985', color: '#f8fafc' }}
                  sx={{ '&[data-checked=true] svg': { color: '#38bdf8' } }}
                  _disabled={{ color: '#64748b', opacity: 1, cursor: 'not-allowed' }}
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
