import { BaseText } from "../base/text/BaseText";

const TitleText = function TitleText({
  children,
}) {


  return (
    <BaseText 
      fontSize="2xl"
      text="center"
      color="red-800"
      uppercase={true}
    >{ children }</BaseText>
  );
};

export { TitleText };
