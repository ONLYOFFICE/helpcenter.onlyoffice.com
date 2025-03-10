import { Trans } from "next-i18next";
import { AccordionItem } from "@components/common/accordion";
import StyledAccordionContent from "./styled-accordion-content";
import Heading from "@components/common/heading";
import ExternalLink from "@components/common/external-link";

const AccordionContent = ({ t }) => {
  return (
    <StyledAccordionContent>
      <Heading className="title-accordion" level={3}>
        {t("FrequentlyAskedQuestions")}
      </Heading>
      <AccordionItem heading={t("AccordionHeadingOOLicense")}>
        <Trans
          i18nKey="AccordionDescriptionOOLicense"
          components={{ 
            1: <ExternalLink href="https://www.onlyoffice.com/legalterms.aspx" />
          }}
          values={{
            "AccordionDescriptionOOLicenseLink": t("AccordionDescriptionOOLicenseLink")
          }}
        />
      </AccordionItem>
      <AccordionItem heading={t("AccordionHeadingRequestAssistance")}>
        <Trans
          i18nKey="AccordionDescriptionRequestAssistance"
          components={{ 
            1: <ExternalLink href="https://forum.onlyoffice.com/" />,
            2: <ExternalLink href="https://www.onlyoffice.com/support.aspx" />
          }}
          values={{
            "AccordionDescriptionRequestAssistanceForumLink": t("AccordionDescriptionRequestAssistanceForumLink"),
            "AccordionDescriptionRequestAssistanceSupportLink": t("AccordionDescriptionRequestAssistanceSupportLink")
          }}
        />
      </AccordionItem>
      <AccordionItem heading={t("AccordionHeadingIntegrateOO")}>
        <Trans
          i18nKey="AccordionDescriptionIntegrateOO"
          components={{ 
            1: <ExternalLink href="https://api.onlyoffice.com/" />
          }}
          values={{
            "AccordionDescriptionIntegrateOOLink": t("AccordionDescriptionIntegrateOOLink")
          }}
        />
      </AccordionItem>
      <AccordionItem heading={t("AccordionHeadingContributeOO")}>
        <Trans
          i18nKey="AccordionDescriptionContributeOO"
          components={{ 
            1: <ExternalLink href="https://testnew-helpcenter.onlyoffice.com/docs/contribution" />
          }}
          values={{
            "AccordionDescriptionContributeOOLink": t("AccordionDescriptionContributeOOLink")
          }}
        />
      </AccordionItem>
    </StyledAccordionContent>
  );
};

export default AccordionContent;
