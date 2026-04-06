import StyledGlossaryContent from "./styled-glossary-content";
import LeftMenu from "@components/screens/common/left-menu";
import StyledWrapperContent from "@components/screens/common/wrapper-content/styled-wrapper-content";
import AlphabetContainer from "@components/screens/common/alphabet-container";
import Text from "@components/common/text";
import Breadcrumbs from "@components/screens/common/breadcrumbs";
import Heading from "@components/common/heading";

const GlossaryContent = ({ t, glossaryData, leftMenuData, leftMenuIsOpen, setLeftMenuIsOpen, locale }) => {
  return (
    <StyledGlossaryContent>
      <StyledWrapperContent>
        <LeftMenu
          t={t}
          locale={locale}
          pageName={t("Glossary")}
          leftMenuData={leftMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
        <div className="wrapper">
          <Breadcrumbs t={t} pageName={t("Glossary")} />
          <Heading className="wrapper-title" level={1}>{t("Glossary")}</Heading>
          {locale === "it" && <div className="attention-banner">
            <Text label={t("TranslationOutOfDate")} />
          </div>}
          <Text label={t("HereAreTheBaseTerms")} />
          <AlphabetContainer t={t} data={glossaryData} locale={locale} />
        </div>
      </StyledWrapperContent>
    </StyledGlossaryContent>
  );
};


export default GlossaryContent;
