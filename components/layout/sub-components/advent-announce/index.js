import locales from "./locales/index";
import StyledAdventAnnounce from "./styled-advent-announce";
import { useRouter } from "next/router";
import { Trans } from "next-i18next";

const OOAdventAnnounce = () => {
  const router = useRouter();
  const locale = router.locale;
  const t = (key) =>
    locales[locale === "pt-BR" ? "pt" : locale][key] || locales.en[key] || key;

  return (
    <StyledAdventAnnounce className={`oo-advent-announce ${locale}`}>
      <a
        className={`oo-advent-announce-wrapper ${locale}`}
        href={t("AdventAnnounceLink")}
      >
        <div className="oo-advent-announce-text">
          <div className="oo-advent-announce-text-desktop">
            <Trans
              t={t}
              i18nKey={"AdventAnnounceDesktop"}
              components={[<span key="0" style={{ fontWeight: "bold" }} />]}
            />
          </div>
          <div className={`oo-advent-announce-text-mobile ${locale}`}>
            {t("AdventAnnounceMobile")}
          </div>
        </div>
      </a>
    </StyledAdventAnnounce>
  );
};

export default OOAdventAnnounce;
