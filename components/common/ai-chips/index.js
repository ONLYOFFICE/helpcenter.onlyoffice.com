import StyledAiChips from "./styled-ai-chips";
import { useTranslation } from "next-i18next";

const AiChips = () => {
  const { t } = useTranslation();

  return (
    <StyledAiChips>{t("AIDescription")}</StyledAiChips>
  );
};

export default AiChips;
