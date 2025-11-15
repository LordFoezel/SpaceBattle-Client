import { forwardRef, type MouseEventHandler } from "react";
import { Link, type LinkProps } from "react-router-dom";

import { BaseButton, type BaseButtonProps } from "./BaseButton";

type LinkState = LinkProps["state"];
type LinkTo = LinkProps["to"];

interface BaseButtonLinkProps extends Omit<BaseButtonProps, "onClick"> {
  to: LinkTo;
  replace?: boolean;
  state?: LinkState;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const BaseButtonLink = forwardRef<HTMLButtonElement, BaseButtonLinkProps>(function BaseButtonLink(
  {
    to,
    replace = false,
    state,
    isDisabled = false,
    onClick,
    children,
    ...rest
  },
  ref,
) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (typeof onClick === "function") {
      onClick(event);
    }
  };

  return (
    <BaseButton
      ref={ref}
      as={Link}
      to={to}
      replace={replace}
      state={state}
      isDisabled={isDisabled}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </BaseButton>
  );
});

export { BaseButtonLink };
