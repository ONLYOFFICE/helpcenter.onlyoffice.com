import StyledDownloadArea from "./styled-download-area";
import Heading from "@components/common/heading";
import ExternalLink from "@components/common/external-link";
import Text from "@components/common/text";
import { Trans, useTranslation } from "react-i18next";

const DownloadArea = ({ slug, subcat, locale, ...rest }) => {
  const { t, i18n } = useTranslation("common");
  const translations = i18n.services.resourceStore.data?.[locale]?.common || {};
  const slugNormalized = slug?.replace(/\s+/g, "").toLowerCase();

  const matchedKey = Object.entries(translations).find(
    ([key, value]) =>
      typeof value === "string" &&
      value.replace(/\s+/g, "").toLowerCase() === slugNormalized
  )?.[0]?.toLowerCase();

  const getLabelAndHref = () => {
    switch (matchedKey) {
      case "docspace":
        return { label: "HostOnYourOwnServerDocSpace", downloadHref: "docspace" };
      case "workspace":
        return {
          label: "HostOnYourOwnServerWorkspace",
          downloadHref: "https://www.onlyoffice.com/download-workspace?from=helpcenter"
        };
      case "mobileapps":
        if (subcat === "iOS") {
          return { label: "HostiOS", downloadHref: "https://itunes.apple.com/us/app/onlyoffice-documents/id944896972" };
        }
        return { label: "HostAndroid", downloadHref: "https://play.google.com/store/apps/details?id=com.onlyoffice.documents" };
      case "desktopapps":
        return {
          label: "HostDesktop",
          downloadHref: "https://www.onlyoffice.com/download-desktop?from=helpcenter"
        };
      default:
        return { label: "HostOnYourOwnServerDocs", downloadHref: "docs" };
    }
  };

  const { label, downloadHref } = getLabelAndHref();

  const renderButtons = () => {
    if (!matchedKey || ["mobileapps", "workspace", "desktopapps"].includes(matchedKey) === false) {
      return (
        <>
          <ExternalLink
            className="download-button"
            href={`https://www.onlyoffice.com/${locale !== "en" ? locale + "/" : ""}download-${downloadHref}?from=helpcenter`}
            label={t("GetItNow")}
          />
          <ExternalLink
            className="download-button"
            href={`https://www.onlyoffice.com/${locale !== "en" ? locale + "/" : ""}${downloadHref}-registration?from=helpcenter`}
            label={locale === "zh" && matchedKey === "docspace" ? t("UseCloud") : t("UseInTheCloud")}
          />
        </>
      );
    }

    if (matchedKey === "mobileapps") {
      return (
        <ExternalLink
          className={`download-button ${subcat === "iOS" ? "ios" : "android"}`}
          href={downloadHref}
        />
      );
    }
    return <ExternalLink className="download-button" href={downloadHref} label={t("Download")} />;
  };

  return (
    <StyledDownloadArea {...rest}>
      <div className="download-wrapper">
        <div className="download-content">
          <Heading level={3} className="download-title"><Trans
            t={t}
            i18nKey={label}
            components={[<Text as="span" isInline={false} key={0} />]}
          /></Heading>
          <div className="download-buttons">
            {renderButtons()}
          </div>
        </div>
      </div>
    </StyledDownloadArea>
  );
};

export default DownloadArea;
