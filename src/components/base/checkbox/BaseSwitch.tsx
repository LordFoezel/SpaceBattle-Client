import { forwardRef, type ChangeEventHandler, type MouseEventHandler } from "react";
import { Switch } from "@chakra-ui/react";
import colors from "../../../theme/colors.js";

interface BaseSwitchProps {
  name?: string;
  value?: any;
  isDisabled?: boolean;
  variant?: 'solid' | 'raised';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: MouseEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  [key: string]: any;
}

const BaseSwitch = forwardRef<HTMLInputElement, BaseSwitchProps>(function BaseSwitch(props, ref) {
  const {
    name,
    value,
    isDisabled = false,
    variant = 'solid',
    size = 'md',
    onClick,
    onChange,
    ...rest
  } = props;

  const hasHandler = typeof onChange === 'function' || typeof onClick === 'function';
  const isControlled = hasHandler && value !== undefined && value !== null;
  const toBool = (v: any) => {
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

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (typeof onChange === 'function') onChange(e);
    if (typeof onClick === 'function') onClick(e as unknown as React.MouseEvent<HTMLInputElement>);
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
      {...rest}
    />
  );
});

export { BaseSwitch };
