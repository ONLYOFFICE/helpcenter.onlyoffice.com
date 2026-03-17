import StyledDownloadArea from "./styled-download-area";
import Heading from "@components/common/heading";
import ExternalLink from "@components/common/external-link";
import { Trans, useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const DownloadArea = ({ slug, subcat, locale, ...rest }) => {
  const { t } = useTranslation("common");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLabelAndHref = () => {
    switch (slug) {
      case "docspace":
        return { label: "HostOnYourOwnServerDocSpace", downloadHref: "docspace" };
      case "workspace":
        return { label: "HostOnYourOwnServerWorkspace", downloadHref: "https://www.onlyoffice.com/download-workspace?from=helpcenter" };
      case "mobile":
        return subcat === "iOS"
          ? { label: "HostiOS", downloadHref: "https://itunes.apple.com/us/app/onlyoffice-documents/id944896972" }
          : { label: "HostAndroid", downloadHref: "https://play.google.com/store/apps/details?id=com.onlyoffice.documents" };
      case "desktop":
        return { label: "HostDesktop", downloadHref: "https://www.onlyoffice.com/download-desktop?from=helpcenter" };
      default:
        return { label: "HostOnYourOwnServerDocs", downloadHref: "docs" };
    }
  };

  const { label, downloadHref } = getLabelAndHref();

  const renderButtons = () => {
    if (!["mobile", "workspace", "desktop"].includes(slug)) {
      return (
        <>
          <ExternalLink
            className="download-button"
            href={`https://www.onlyoffice.com/${locale === "pt-BR" ? "pt/" : locale !== "en" ? locale + "/" : ""}download-${downloadHref}?from=helpcenter`}
            label={t("GetItNow")}
          />
          <ExternalLink
            className="download-button"
            href={`https://www.onlyoffice.com/${locale === "pt-BR" ? "pt/" : locale !== "en" ? locale + "/" : ""}${downloadHref}-registration?from=helpcenter`}
            label={locale === "zh" && slug === "docspace" ? t("UseCloud") : t("UseInTheCloud")}
          />
        </>
      );
    }
    if (slug === "mobile") {
      return <ExternalLink className={`download-button ${subcat === "iOS" ? "ios" : "android"}`} href={downloadHref} />;
    }
    return <ExternalLink className="download-button" href={downloadHref} label={t("Download")} />;
  };

  if (!mounted) return null;
  return (
    <StyledDownloadArea {...rest}>
      <div className="download-wrapper">
        <div className="download-content">
          <Heading level={3} className="download-title">
            <Trans
              t={t}
              i18nKey={label}
              components={[<span key={0} />]}
            />
          </Heading>
          <div className="download-buttons">{renderButtons()}</div>
        </div>
      </div>
    </StyledDownloadArea>
  );
};

export default DownloadArea;
