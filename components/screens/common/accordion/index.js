import { Trans } from "next-i18next";
import { AccordionItem } from "@components/common/accordion";
import StyledAccordionContent from "./styled-accordion-content";
import Heading from "@components/common/heading";
import ExternalLink from "@components/common/external-link";
import Link from "next/link";

const AccordionContent = ({ t }) => {
  return (
    <StyledAccordionContent>
      <Heading className="title-accordion" level={3}>
        {t("FrequentlyAskedQuestions")}
      </Heading>
      <AccordionItem heading={t("Q1")}>
        <Trans
          i18nKey="A1"
          components={[
            <ExternalLink
              color="#ff6f3d"
              key={0}
              style={{ display: "unset" }}
              href="https://github.com/ONLYOFFICE"
            />,
            <span style={{display: 'block', padding: '10px'}} key={1}></span>,
            <ExternalLink
              color="#ff6f3d"
              key={2}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/desktop"
            />,
            <ExternalLink
              color="#ff6f3d"
              key={3}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/download-desktop#mobile"
            />,
            <ExternalLink
              color="#ff6f3d"
              key={4}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/docspace-registration"
            />,
            <ExternalLink
              color="#ff6f3d"
              key={5}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/download-community"
            />,
          ]}
        />
      </AccordionItem>
      <AccordionItem heading={t("Q2")}>
        <Trans
          i18nKey="A2"
          components={[
            <ExternalLink
              color="#ff6f3d"
              key={0}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/office-suite"
            />,
            <span style={{display: 'block', padding: '10px'}} key={1}></span>,
            <ExternalLink
              color="#ff6f3d"
              key={2}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/all-connectors"
            />,
            <ExternalLink
              color="#ff6f3d"
              key={3}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/docspace"
            />,
            <ExternalLink
              color="#ff6f3d"
              key={4}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/developer-edition"
            />,
            <ExternalLink
              color="#ff6f3d"
              key={5}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/desktop"
            />,
            <ExternalLink
              color="#ff6f3d"
              key={6}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/download-desktop#mobile"
            />,
          ]}
        />
      </AccordionItem>
      <AccordionItem heading={t("Q3")}>
        <Trans
          i18nKey="A3"
          components={[
            <ExternalLink
              color="#ff6f3d"
              key={0}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/security"
            />,
          ]}
        />
      </AccordionItem>
      <AccordionItem heading={t("Q4")}>
        <Trans
          i18nKey="A4"
          components={[
            <ExternalLink
              color="#ff6f3d"
              key={0}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/legalterms"
            />,
          ]}
        />
      </AccordionItem>
      <AccordionItem heading={t("Q5")}>
        <Trans
          i18nKey="A5"
          components={[
            <ExternalLink
              color="#ff6f3d"
              key={0}
              style={{ display: "unset" }}
              href="https://www.onlyoffice.com/download-desktop#desktop"
            />,
          ]}
        />
      </AccordionItem>
      <AccordionItem heading={t("Q6")}>
        <Trans
          i18nKey="A6"
        />
      </AccordionItem>
      <AccordionItem heading={t("Q7")}>
        <Trans
          i18nKey="A7"
          components={[
            <ExternalLink
              color="#ff6f3d"
              key={0}
              style={{ display: "unset" }}
              href="https://community.onlyoffice.com/"
            />,
          ]}
        />
      </AccordionItem>
      <AccordionItem heading={t("Q8")}>
        <Trans
          i18nKey="A8"
          components={[
            <ExternalLink
              color="#ff6f3d"
              key={0}
              style={{ display: "unset" }}
              href="https://api.onlyoffice.com"
            />,
          ]}
        />
      </AccordionItem>
      <AccordionItem heading={t("Q9")}>
        <Trans
          i18nKey="A9"
          components={[
            <Link
              color="#ff6f3d"
              key={0}
              style={{ display: "unset" }}
              href="https://helpcenter.onlyoffice.com/docs/contribution"
            />,
          ]}
        />
      </AccordionItem>
      <AccordionItem heading={t("Q10")}>
        <Trans
          i18nKey="A10"
          components={[
            <ExternalLink
              color="#ff6f3d"
              key={0}
              style={{ display: "unset" }}
              href="https://onlyo.co/3UKteV"
            />,
          ]}
        />
      </AccordionItem>
      <AccordionItem heading={t("Q11")}>
        <Trans
          i18nKey="A11"
        />
      </AccordionItem>
    </StyledAccordionContent>
  );
};

export default AccordionContent;
