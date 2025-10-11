import { Title } from "./Title";
import { PageTitle } from "./PageTitle";
import { PageInfo } from "./PageInfo";
import { TransparentCard } from "./TransparentCard";
import { BaseSeparator } from "../base/text/BaseSeparator";

const PageHeader = function PageHeader({ title, info }) {

  return (
    <TransparentCard direction="col" padding="0" margin="0" gap="2" items="center">
      <Title />
      <PageTitle text={title} />
      <PageInfo text={info} />
      <BaseSeparator color="gray-500" />
    </TransparentCard>
  );
};

export { PageHeader };
