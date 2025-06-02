import StyledTagsContent from "./styled-tags-content";
import { useState } from "react";
import getTagsArticle from "@lib/strapi/getTagsArticle";
import LeftMenu from "@components/screens/common/left-menu";
import StyledWrapperContent from "@components/screens/common/wrapper-content/styled-wrapper-content";
import ArticlePopup from "@components/screens/common/article-popup";
import AlphabetContainer from "@components/screens/common/alphabet-container";
import Breadcrumbs from "@components/screens/common/breadcrumbs";
import Heading from "@components/common/heading";

const TagsContent = ({ t, locale, tagsData, leftMenuData, leftMenuIsOpen }) => {
  const [modalActive, setModalActive] = useState(false);
  const [tagName, setTagName] = useState();
  const [tagItems, setTagItems] = useState();
  const [hasMoreTags, setHasMoreTags] = useState(false);
  const page = 1;

  const handleTagModal = async (tagName) => {
    const data = await getTagsArticle(locale, tagName, 2, page, preview);

    const { articles, article_desktops, article_docs, article_docspaces, article_mobiles, article_workspaces } = data;
    const hasMoreTags = [articles, article_desktops, article_docs, article_docspaces, article_mobiles, article_workspaces].some(({ meta: { pagination } }) => pagination.total > pagination.page + 1);

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
    <StyledTagsContent>
      <StyledWrapperContent>
        <LeftMenu
          t={t}
          leftMenuData={leftMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
        />
        <div className="wrapper">
          <Breadcrumbs t={t} pageName={t("Tags")} />
          <Heading className="wrapper-title" level={1}>{t("Tags")}</Heading>
          <AlphabetContainer
            t={t}
            data={tagsData}
            handleTagModal={handleTagModal}
            isTagPage={true}
          />
          <ArticlePopup
            t={t}
            locale={locale}
            tagName={tagName}
            tagItems={tagItems}
            modalActive={modalActive}
            setModalActive={setModalActive}
            hasMoreTags={hasMoreTags}
            page={page}
            setHasMoreTags={setHasMoreTags}
            setTagItems={setTagItems}
          />
        </div>
      </StyledWrapperContent>
    </StyledTagsContent>
  );
};

export default TagsContent;
