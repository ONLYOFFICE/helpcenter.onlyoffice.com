import StyledMainContent from "./styled-main-content";
import { useState, useEffect } from "react";
import getLeftMenu from "@lib/strapi/getLeftMenu";
import LeftMenu from "@components/screens/common/left-menu";
import SearchArea from "@components/screens/common/search-area";
import Category from "./sub-components/category";
import GuidesCell from "./sub-components/guides-cell";
import Masonry from "react-masonry-css";
import Heading from "@components/common/heading";

const MainContent = ({ t, locale, data, leftMenuIsOpen, setLeftMenuIsOpen }) => {
  const [leftMenuData, setLeftMenuData] = useState(data);
  const [showLeftMenu, setShowLeftMenu] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const data = await getLeftMenu(locale);
      setLeftMenuData(data);
    };

    loadData();

    const handleResize = () => {
      setShowLeftMenu(window.innerWidth >= 593 && window.innerWidth <= 1024);

      if (window.innerWidth < 593) {
        setLeftMenuIsOpen(false);
      };
    };
    
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [locale]);

  return (
    <>
      {showLeftMenu && (
        <LeftMenu
          t={t}
          leftMenuData={leftMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
      )}
      <StyledMainContent>
        <div className="info-content">
          <div className="info-content-header">
            <Heading className="info-content-title" level={1} label={t("WelcomeToHelpCenter")} />
          </div>
          <SearchArea t={t} className="info-content-search" placeholder={t("HowCanWeHelp?")} />
          <Category t={t} data={data} />
        </div>

        <div className="guides-cards">
          <Masonry
            breakpointCols={{ default: 2, 592: 1 }}
            className="guides-cards-items"
            columnClassName="guides-cards-items-column">
            {data?.data?.sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity)).map((item, index) => (
              <GuidesCell t={t} data={item} key={index} />
            ))}
          </Masonry>
        </div>
      </StyledMainContent>
    </>
  );
};

export default MainContent;