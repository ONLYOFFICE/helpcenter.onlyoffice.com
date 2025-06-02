import StyledSubCategoryContent from "./styled-subcategory-content";
import { useRef, useState, useEffect } from "react";
import getTagsArticle from "@lib/strapi/getTagsArticle";
import SubCategoryItem from "./sub-components/subcategory-item";
import LeftMenu from "@components/screens/common/left-menu";
import StyledWrapperContent from "@components/screens/common/wrapper-content/styled-wrapper-content";
import Heading from "@components/common/heading";
import Tag from "@components/common/tag";
import InternalLink from "@components/common/internal-link";
import Breadcrumbs from "@components/screens/common/breadcrumbs";
import VideoBlock from "@components/screens/common/video-block";
import ArticlePopup from "@components/screens/common/article-popup";
import ReactHtmlParser from "react-html-parser";
import ScrollToTopButton from "@components/screens/common/scroll-to-top-button";
import ImagePopup from "@components/screens/article-content/sub-components/image-popup";
import StyledRawHtml from "@components/screens/common/raw-html/styled-raw-html";
import { handleFaqAccordionClick, handleChangelogClick } from "@utils/handle-click-functions";
import { handleImagePopupClick } from "@utils/handle-click-functions";

const SubCategoryContent = ({
  t,
  locale,
  pageName,
  pageIcon,
  categoryData,
  articleData,
  categorySlug,
  categoryName,
  categoryUrl,
  level2CategoryName,
  level2CategoryUrl,
  level3CategoryName,
  level3CategoryUrl,
  leftMenuIsOpen,
  setLeftMenuIsOpen,
  video,
  pageDescription,
  leftMenuData,
  tags
}) => {
  const leftMenuRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef();
  const tagsRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [imageModalActive, setImageModalActive] = useState(false);
  const [bigPhotoSrc, setBigPhotoSrc] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const [tagName, setTagName] = useState();
  const [tagItems, setTagItems] = useState();
  const [hasMoreTags, setHasMoreTags] = useState(false);
  const sortItems = (a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || (a.name || a.title).localeCompare(b.name || b.title);

  useEffect(() => {
    const firstHeader = document.querySelector('.changelog-main-header');
    if (firstHeader) {
      firstHeader.click();
    }

    const scrollHandler = () => {
      if (window.innerHeight < contentRef.current?.offsetHeight) {
        setShowButton(window.scrollY > window.innerHeight);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [pageDescription]);

  const handleClick = (event) => {
    handleFaqAccordionClick(event, containerRef.current);
    handleChangelogClick(event);
    handleImagePopupClick(event, setBigPhotoSrc, setImageModalActive);
  };

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
    <StyledSubCategoryContent>
      <StyledWrapperContent>
        <LeftMenu
          t={t}
          ref={leftMenuRef}
          leftMenuData={leftMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
        <div className="wrapper">
          <Breadcrumbs
            t={t}
            categoryName={categoryName}
            categoryUrl={categoryUrl}
            level2CategoryName={level2CategoryName}
            level2CategoryUrl={level2CategoryUrl}
            level3CategoryName={level3CategoryName}
            level3CategoryUrl={level3CategoryUrl}
            pageName={pageName}
          />
          <Heading className="wrapper-title subcategory-heading" level={1}>
            {pageIcon?.url &&
              <img src={pageIcon?.url} alt={pageName} />
            }
            {pageName}
          </Heading>
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
            <StyledRawHtml onClick={handleClick} ref={containerRef} className="subcategory-description">{ReactHtmlParser(pageDescription)}</StyledRawHtml>
          }
          <div ref={contentRef}>
            {categoryData?.length > 0 ? (
              <>
                {articleData?.length > 0 && (
                  <ul className="subcategory-articles">
                    {articleData.sort(sortItems).map((item, index) => (
                      <li key={index}>
                        <InternalLink href={item.url}>
                          {item.icon?.url && (
                            <img src={item.icon?.url} alt={item.level_4_title || item.title} />
                          )}
                          {item.level_4_title || item.title}
                        </InternalLink>
                      </li>
                    ))}
                  </ul>
                )}
                {categoryData.sort(sortItems).map((item, index) => (
                  <SubCategoryItem
                    headingName={item.name}
                    headingIcon={item.icon?.url || item.category_pic?.url}
                    id={`${item.name.replace(/ /g, "_").toLowerCase()}_block`}
                    links={[
                      ...(item[`level_4_${categorySlug === "docs" ? "docs" : `${categorySlug}s`}`] || []),
                      ...(item[`article_${categorySlug === "docs" ? "docs" : `${categorySlug}s`}`] || [])
                    ]}
                    categorySlug={categorySlug}
                    sortItems={sortItems}
                    key={index}
                  />
                ))}
              </>
            ) : articleData?.length > 0 ? (
              <SubCategoryItem links={articleData} sortItems={sortItems} />
            ) : (
              <></>
            )}
          </div>
          {video?.data &&
            <VideoBlock t={t} video={video} />
          }
        </div>
        <ImagePopup
          t={t}
          image={bigPhotoSrc}
          active={imageModalActive}
          setActive={setImageModalActive}
        />
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
        <ScrollToTopButton showButton={showButton} />
      </StyledWrapperContent>
    </StyledSubCategoryContent>
  );
};

export default SubCategoryContent;