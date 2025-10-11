import { BaseText } from "../base/text/BaseText";

const Title = function Title() {

  return (
    <BaseText
      fontSize="md"
      text="center"
      color="blue-300"
      uppercase={true}
    >{t("app.title")}</BaseText>
  );
};

export { Title };
