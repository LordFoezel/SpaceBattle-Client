import { BaseText } from "../base/text/BaseText";

const PageTitle = function PageTitle({text}) {

  return (
    <BaseText
      fontSize="4xl"
      text="center"
    >{text}</BaseText>
  );
};

export { PageTitle };
