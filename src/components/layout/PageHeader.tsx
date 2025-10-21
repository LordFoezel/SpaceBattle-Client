import type { ReactNode } from "react";
import { Title } from "./Title";
import { PageTitle } from "./PageTitle";
import { PageInfo } from "./PageInfo";
import { TransparentCard } from "./TransparentCard";
import { BaseSeparator } from "../base/text/BaseSeparator";

interface PageHeaderProps {
  title?: string;
  info?: string;
  children?: ReactNode;
  [key: string]: any;
}

const PageHeader = function PageHeader({ title, info, children, ...rest }: PageHeaderProps) {
  return (
    <TransparentCard direction="col" padding="0" margin="0" gap="2" items="center" {...rest}>
      <Title />
      <PageTitle text={title} />
      <PageInfo text={info} />
      <BaseSeparator color="gray-300" />
      {children}
    </TransparentCard>
  );
};

export { PageHeader };

