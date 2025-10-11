import { BaseText } from "../base/text/BaseText";

const PageInfo = function PageInfo({text}) {

  return (
    <BaseText
      fontSize="xs"
      text="center"
      color="gray-500"
    >{text}</BaseText>
  );
};

export { PageInfo };
