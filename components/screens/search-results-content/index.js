import StyledSearchResultsContent from "./styled-search-results-content";
import { useEffect, useState } from "react";
import getLeftMenu from "@lib/strapi/getLeftMenu";
import Highlighter from "react-highlight-words";
import SearchArea from "@components/screens/common/search-area";
import LeftMenu from "@components/screens/common/left-menu";
import InternalLink from "@components/common/internal-link";
import Heading from "@components/common/heading";
import Pagination from "@components/common/pagination";

const SearchResultsContent = ({ t, categoriesMenuData, leftMenuIsOpen, setLeftMenuIsOpen, page, searchResults, locale, sort, query }) => {
  const countPage = searchResults.meta?.pagination.pageCount;
  const [pageLimit, setPageLimit] = useState(countPage > 7 ? 7 : countPage);
  const [leftMenuData, setLeftMenuData] = useState(categoriesMenuData);
  const [showLeftMenu, setShowLeftMenu] = useState(false);

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

  const arrayStart = [...Array(countPage).keys()].map(i => i + 1)
    .filter(item => item % pageLimit === 0)
    .map((item, index) => item - index);

  const checkInterval = (page, min, max) => {
    if ((page >= min) && (page < max)) return min;
    if (page <= min && page < max) return 0;
    if (page >= min && !max) return min;
  };

  const getPaginationGroup = () => {
    let start = 0;
    for (let i = 0; i < arrayStart.length; i++) {
      if (checkInterval(page, arrayStart[i], arrayStart[i + 1])) {
        start = checkInterval(page, arrayStart[i], arrayStart[i + 1])
        break;
      }
    }
    return countPage > pageLimit ?
      new Array(countPage - start < pageLimit ? countPage - start + 1 : pageLimit).fill().map((_, idx) => start === 0 ? start + idx + 1 : start + idx) :
      new Array(countPage).fill().map((_, idx) => idx + 1);
  };

  const resizeHandler = () => {
    window.innerWidth < 425 ? setPageLimit(countPage > 5 ? 5 : countPage) : setPageLimit(countPage > 7 ? 7 : countPage);
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  });

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
      <StyledSearchResultsContent>
        <div className="search-results-header">
          <SearchArea placeholder={t("HowCanWeHelp?")} query={query} />
        </div>

        {searchResults?.data?.length > 0 ? (
          <div className="search-results-wrapper">
            <div className="search-results-found">{searchResults.meta?.pagination.total ? searchResults.meta?.pagination.total : 0} {t("ResultsFound")}</div>
            <div className="search-results-items">
              {searchResults?.data?.map((item, index) => (
                <div className="search-results-item" key={index}>
                  <InternalLink className="search-results-link" href={item?.url}>
                    <Highlighter className="search-results-query" searchWords={[query]} textToHighlight={item?.title} />
                  </InternalLink>
                  <p className="search-results-description">
                    <Highlighter className="search-results-query" searchWords={[query]} textToHighlight={item?.description?.replace(/<[^>]*>/g, "") || item?.content.replace(/<[^>]*>/g, '')} />
                  </p>
                </div>
              ))}
            </div>
            {countPage !== 0 && countPage !== 1 &&
              <Pagination
                countPage={countPage}
                getPaginationGroup={getPaginationGroup()}
                sort={sort}
                page={Number(page)}
              />
            }
          </div>
        ) : (
          <div className="search-results-wrapper not-found">
            <Heading className="search-results-not-found-title" level={3} label={t("NoResult")} />
            <div className="search-results-not-found-img"></div>
            <InternalLink className="search-results-link main" href="/">{t("GoToMainPage")}</InternalLink>
          </div>
        )}
      </StyledSearchResultsContent>
    </>
  );
};

export default SearchResultsContent;