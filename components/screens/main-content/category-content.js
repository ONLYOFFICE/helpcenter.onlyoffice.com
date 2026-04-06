import StyledMainContent from "./styled-main-content";
import { useState, useEffect } from "react";
import getLeftMenu from "@lib/strapi/getLeftMenu";
import topSlugIdData from "./data/top-slugid.json";
import LeftMenu from "@components/screens/common/left-menu";
import AlgoliaAsk from "@components/common/algolia-ask";
import InternalLink from "@components/common/internal-link";
import Heading from "@components/common/heading";
import Masonry from "react-masonry-css";
import CategoryGuidesCell from "./sub-components/guides-cell/category-guides-cell";

const Level1CategoryContent = ({ t, locale, categoriesMenuData, categoryName, categoryImg, data, categorySlug, leftMenuIsOpen, setLeftMenuIsOpen }) => {
  const [leftMenuData, setLeftMenuData] = useState(categoriesMenuData);
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const topData = data.filter(item => topSlugIdData.includes(item.slug_id));
  const isIntegrations = categorySlug === "integrations";

  const docspaceItems = isIntegrations
    ? data
      .filter(item => item.url?.endsWith("-docspace.aspx"))
      .sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || (a.name || a.title).localeCompare(b.name || b.title))
    : [];

  const docsItems = isIntegrations
    ? data
      .filter(item => !item.url?.endsWith("-docspace.aspx"))
      .sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || (a.name || a.title).localeCompare(b.name || b.title))
    : [];

  const regularItems = !isIntegrations
    ? data
      .filter(item => !topSlugIdData.includes(item.slug_id))
      .sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || (a.name || a.title).localeCompare(b.name || b.title))
    : [];

  useEffect(() => {
    const loadData = async () => {
      const data = await getLeftMenu(locale);
      setLeftMenuData(data);
    };

    loadData();

    const handleResize = () => {
      setShowLeftMenu(window.innerWidth <= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [locale]);

  const renderMasonry = (items) => (
    <Masonry
      breakpointCols={{ default: 2, 592: 1 }}
      className="guides-cards-items"
      columnClassName="guides-cards-items-column">
      {items.map((item, index) => (
        <CategoryGuidesCell
          data={item}
          categorySlug={categorySlug}
          key={index}
          t={t}
        />
      ))}
    </Masonry>
  );

  return (
    <>
      {showLeftMenu && (
        <LeftMenu
          t={t}
          locale={locale}
          leftMenuData={leftMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
      )}
      <StyledMainContent>
        <div className="info-content category-content">
          <div className="info-content-header">
            <img className="info-content-icon" src={categoryImg} alt={categoryName} />
            <Heading className="info-content-title" level={1} label={categoryName} />
          </div>
          <AlgoliaAsk t={t} locale={locale} />
        </div>

        <div className="guides-cards bg-gray">
          {topData.length > 0 && (
            <div className="guides-cards-top">
              {topData
                .sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || (a.name || a.title).localeCompare(b.name || b.title))
                .map((item, index) => (
                  <InternalLink className="guides-cards-top-link" href={item.url} key={index}>
                    <img src={item.card_field_img?.url} alt={item.name} />
                    <div>{item.name}</div>
                  </InternalLink>
                ))}
            </div>
          )}

          {isIntegrations ? (
            <>
              {docsItems?.length > 0 && (
                <div className="guides-cards-section">
                  <Heading className="guides-cards-section-title" level={2} label={t("ForDocs")} />
                  {renderMasonry(docsItems)}
                </div>
              )}
              {docspaceItems.length > 0 && (
                <div className="guides-cards-section">
                  <Heading className="guides-cards-section-title" level={2} label={t("ForDocSpace")} />
                  {renderMasonry(docspaceItems)}
                </div>
              )}
            </>
          ) : (
            renderMasonry(regularItems)
          )}
        </div>
      </StyledMainContent>
    </>
  );
};

export default Level1CategoryContent;