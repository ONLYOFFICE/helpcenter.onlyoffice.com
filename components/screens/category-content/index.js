import { useState, useEffect, useRef } from "react";
import StyledCategoryContent from "./styled-category-content";
import StyledRawHtml from "@components/screens/common/raw-html/styled-raw-html";
import parse from "html-react-parser";
import Cookies from "universal-cookie";
import { tableBuilder } from "@utils/helpers/TableBuilder/table-builder";
import getTagsArticle from "@lib/strapi/getTagsArticle";
import InternalLink from "@components/common/internal-link";
import Heading from "@components/common/heading";
import Tag from "@components/common/tag";
import CategoryItem from "./sub-components/category-item";
import LeftMenu from "@components/screens/common/left-menu";
import StyledWrapperContent from "@components/screens/common/wrapper-content/styled-wrapper-content";
import Breadcrumbs from "@components/screens/common/breadcrumbs";
import ScrollToTopButton from "@components/screens/common/scroll-to-top-button";
import ArticlePopup from "@components/screens/common/article-popup";

const CategoryContent = ({
  t,
  locale,
  categoryName,
  categoryUrl,
  level2CategoryName,
  level2CategoryUrl,
  pageName,
  pageDescription,
  categoryData,
  articleData,
  leftMenuLevel,
  categorySlug,
  leftMenuIsOpen,
  setLeftMenuIsOpen,
  tags,
  leftMenuData
}) => {
  const descriptionRef = useRef(null);
  const tagsRef = useRef(null);
  const catRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [tagName, setTagName] = useState();
  const [tagItems, setTagItems] = useState();
  const [hasMoreTags, setHasMoreTags] = useState(false);
  const cookies = new Cookies(null, { path: "/" });
  const sortPageItems = categoryData?.sort((a, b) =>
    (b.icon_small?.url ? 1 : 0) - (a.icon_small?.url ? 1 : 0) ||
    (a.position ?? Infinity) - (b.position ?? Infinity) || a.name.localeCompare(b.name));

  useEffect(() => {
    if (descriptionRef.current) {
      tableBuilder(descriptionRef.current, cookies);
    }

    const handleScroll = () => {
      if ((descriptionRef?.current && window.innerHeight < descriptionRef.current.offsetHeight) ||
        (catRef?.current && window.innerHeight < catRef.current.offsetHeight)) {
        setShowButton(window.scrollY > window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTagModal = async (tagName) => {
    const data = await getTagsArticle(locale, tagName, 4, 1, preview);

    const { articles, article_desktops, article_docs, article_docspaces, article_mobiles, article_workspaces } = data;
    const hasMoreTags = [articles, article_desktops, article_docs, article_docspaces, article_mobiles, article_workspaces].some(({ meta: { pagination } }) => pagination.pageCount > pagination.page);

    setHasMoreTags(hasMoreTags);
    setTagItems([
      ...articles?.data || [],
      ...article_desktops?.data || [],
      ...article_docs?.data || [],
      ...article_docspaces?.data || [],
      ...article_mobiles?.data || [],
      ...article_workspaces?.data || [],
    ]);
    setTagName(tagName);
    setModalActive(true);
  };

  return (
    <StyledCategoryContent>
      <StyledWrapperContent>
        <LeftMenu
          t={t}
          locale={locale}
          leftMenuData={leftMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
        <div className="wrapper" ref={catRef}>
          <Breadcrumbs
            t={t}
            categoryName={categoryName}
            categoryUrl={categoryUrl}
            level2CategoryName={level2CategoryName}
            level2CategoryUrl={level2CategoryUrl}
            pageName={pageName}
          />
          <Heading className="wrapper-title" level={1} label={pageName} />
          {tags?.data?.length > 0 &&
            <ul ref={tagsRef} className="tags">
              {tags?.data.map((item, index) => (
                <li key={index}>
                  <Tag onClick={() => handleTagModal(item.title)} name={item.title} />
                </li>
              ))}
            </ul>
          }
          {pageDescription &&
            <StyledRawHtml ref={descriptionRef} className="wrapper-description">{parse(pageDescription)}</StyledRawHtml>
          }
          {articleData?.length > 0 && (
            <div className="category-articles">
              {articleData.sort((a, b) => {
                (a.position ?? Infinity) - (b.position ?? Infinity) || a.title.localeCompare(b.title)
              }).map((item, index) => (
                <div id={`${item.title.replace(/ /g, "_").toLowerCase()}_block`} className="category-articles-item" key={index}>
                  {item.icon?.url && (
                    <img src={item.icon?.url} alt={item.name || item.level_4_title || item.title} />
                  )}
                  <InternalLink href={item.url} label={item.level_4_title || item.title} />
                </div>
              ))}
            </div>
          )}
          {sortPageItems?.length > 0 && (
            <div className="category-items">
              {sortPageItems?.map((item, index) => (
                <CategoryItem
                  data={item}
                  leftMenuLevel={leftMenuLevel}
                  categorySlug={categorySlug}
                  key={index}
                />
              ))}
            </div>
          )}
          <ArticlePopup
            t={t}
            locale={locale}
            tagName={tagName}
            tagItems={tagItems}
            modalActive={modalActive}
            setModalActive={setModalActive}
            hasMoreTags={hasMoreTags}
            setHasMoreTags={setHasMoreTags}
            setTagItems={setTagItems}
          />
        </div>
      </StyledWrapperContent>
      <ScrollToTopButton $showButton={showButton} />
    </StyledCategoryContent>
  );
};

export default CategoryContent;