import { BaseText } from "../base/text/BaseText";

interface PageTitleProps {
  text?: string;
}

const PageTitle = function PageTitle({ text }: PageTitleProps) {
  return (
    <BaseText
      fontSize="2xl"
      text="center"
    >{text}</BaseText>
  );
};

export { PageTitle };

