import { BaseText } from "../base/text/BaseText";

interface PageInfoProps {
  text?: string;
}

const PageInfo = function PageInfo({ text }: PageInfoProps) {
  return (
    <BaseText
      fontSize="xs"
      text="center"
      color="gray-500"
    >{text}</BaseText>
  );
};

export { PageInfo };

