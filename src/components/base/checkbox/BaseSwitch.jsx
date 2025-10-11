import { forwardRef } from "react";
import { Switch } from "@chakra-ui/react";
import colors from "../../../theme/colors.js";

const BaseSwitch = forwardRef(function BaseSwitch(
  {
    name, // for forms
    value,
    isDisabled = false,
    variant = 'solid', // solid, raised
    size = 'md', // xs, sm, md, lg
    onClick,
    onChange,
  }, ref) {

  const hasHandler = typeof onChange === 'function' || typeof onClick === 'function';
  const isControlled = hasHandler && value !== undefined && value !== null;
  const toBool = (v) => {
    if (typeof v === 'string') {
      const s = v.toLowerCase();
      if (s === '0' || s === 'false' || s === 'off') return false;
      if (s === '1' || s === 'true' || s === 'on') return true;
    }
    return !!v;
  };
  const checkedProps = isControlled
    ? { isChecked: toBool(value) }
    : (value !== undefined && value !== null ? { defaultChecked: toBool(value) } : {});

  const handleChange = (e) => {
    if (typeof onChange === 'function') onChange(e);
    if (typeof onClick === 'function') onClick(e);
  };

  return (
    <Switch
      ref={ref}
      {...checkedProps}
      name={name}
      variant={variant}
      isDisabled={isDisabled}
      size={size}
      className={name}
      sx={{
        '.chakra-switch__track': {
          backgroundColor: colors.borderSubtle,
          borderColor: colors.border,
        },
        '&[data-checked] .chakra-switch__track': {
          backgroundColor: colors.optionCheckedBg,
          borderColor: colors.optionCheckedBg,
        },
        '.chakra-switch__thumb': {
          backgroundColor: colors.text,
        },
      }}
      onChange={handleChange}
    />
  );
});

export { BaseSwitch };
