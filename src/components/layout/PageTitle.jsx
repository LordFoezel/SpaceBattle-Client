import { BaseText } from "../base/text/BaseText";

const PageTitle = function PageTitle({text}) {

  return (
    <BaseText
      fontSize="2xl"
      text="center"
    >{text}</BaseText>
  );
};

export { PageTitle };
