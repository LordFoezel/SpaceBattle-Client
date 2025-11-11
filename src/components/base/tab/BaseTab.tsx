import { forwardRef, type ReactNode } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  type TabsProps,
  type TabListProps,
  type TabPanelsProps,
  type TabProps,
  type SystemStyleObject,
} from "@chakra-ui/react";
import colors from "../../../theme/colors.js";
import { checkRole, type Role } from "../../../auth/auth.js";

interface BaseTabItem {
  key?: string | number;
  label: ReactNode;
  content: ReactNode;
  isDisabled?: boolean;
  roles?: Role[];
}

interface BaseTabProps extends Omit<TabsProps, "children"> {
  tabs: BaseTabItem[];
  tabListProps?: Omit<TabListProps, "children">;
  tabPanelsProps?: Omit<TabPanelsProps, "children">;
  tabProps?: Omit<TabProps, "children">;
}

const BaseTab = forwardRef<HTMLDivElement, BaseTabProps>(function BaseTab(
  {
    tabs,
    tabListProps = {},
    tabPanelsProps = {},
    tabProps = {},
    variant = "enclosed",
    colorScheme = "blue",
    sx,
    ...rest
  },
  ref
) {
  const safeTabs = Array.isArray(tabs) ? tabs : [];
  const visibleTabs = safeTabs.filter((tabItem) => {
    if (!Array.isArray(tabItem.roles) || tabItem.roles.length === 0) {
      return true;
    }
    return checkRole(tabItem.roles);
  });
  const baseSx: SystemStyleObject = {
    ".chakra-tabs__tablist": {
      borderColor: colors.borderSubtle,
      backgroundColor: colors.surface,
    },
    ".chakra-tabs__tab": {
      color: colors.textMuted,
      _selected: {
        color: colors.text,
        backgroundColor: "rgba(148, 163, 184, 0.12)",
        borderColor: `${colors.border} ${colors.border} ${colors.surface}`,
        boxShadow: `inset 0 0 0 1px ${colors.border}`,
      },
      _hover: {
        color: colors.text,
        backgroundColor: "rgba(148, 163, 184, 0.08)",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
    ".chakra-tabs__tab-panels": {
      backgroundColor: colors.surface,
      borderRadius: "md",
    },
    ".chakra-tabs__tab-panel": {
      padding: 0,
      paddingTop: 2,
    },
  };
  const mergedSx: SystemStyleObject =
    typeof sx === "object" && sx !== null ? { ...baseSx, ...sx } : baseSx;

  return (
    <Tabs
      ref={ref}
      variant={variant}
      colorScheme={colorScheme}
      {...rest}
      sx={mergedSx}
    >
      <TabList {...tabListProps}>
        {visibleTabs.map((tabItem, index) => {
          const key = tabItem.key ?? index;
          return (
            <Tab key={key} isDisabled={tabItem.isDisabled} {...tabProps}>
              {tabItem.label}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels {...tabPanelsProps}>
        {visibleTabs.map((tabItem, index) => {
          const key = tabItem.key ?? index;
          return <TabPanel key={key}>{tabItem.content}</TabPanel>;
        })}
      </TabPanels>
    </Tabs>
  );
});

export { BaseTab };
export type { BaseTabItem, BaseTabProps };
