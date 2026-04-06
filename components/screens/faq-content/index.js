import { useState } from "react";
import StyledFaqContent from "./styled-faq-content";
import StyledWrapperContent from "@components/screens/common/wrapper-content/styled-wrapper-content";
import LeftMenu from "@components/screens/common/left-menu";
import Heading from "@components/common/heading";
import Tag from "@components/common/tag";
import Breadcrumbs from "@components/screens/common/breadcrumbs";
import { AccordionItem } from "@components/common/accordion";
import parse from "html-react-parser";
import getTagsArticle from "@lib/strapi/getTagsArticle";
import ArticlePopup from "@components/screens/common/article-popup";

const FaqContent = ({ t, faqData, locale, leftMenuData, leftMenuIsOpen, setLeftMenuIsOpen }) => {
  const { name, faq_block, tags } = faqData.data[0];
  const [isExpanded, setIsExpanded] = useState(false);
  const [tagName, setTagName] = useState();
  const [tagItems, setTagItems] = useState();
  const [hasMoreTags, setHasMoreTags] = useState(false);
  const [modalActive, setModalActive] = useState(false);

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
    <StyledFaqContent>
      <StyledWrapperContent>
        <LeftMenu
          t={t}
          locale={locale}
          pageName={name}
          leftMenuData={leftMenuData}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
        <div className="wrapper">
          <Breadcrumbs t={t} pageName={name} />
          <Heading className="wrapper-title" level={1} label={name} />
          {tags?.length > 0 && 
            <ul className="tags">
              {tags?.map((item, index) => (
                <li key={index}>
                  <Tag onClick={() => handleTagModal(item.title)} name={item.title} />
                </li>
              ))}
            </ul>
          }
          <div className="switcher" onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? t("Collapse all") : t("Expand all")}</div>
          {faq_block.map((item, index) => (
            <div className="faq-block" key={index}>
              {item.name &&
                <Heading className="faq-title" level={4} label={item.name} />
              }
              <div className="faq-items">
                {item.faq_item.map((item, index) => (
                  <AccordionItem isExpanded={isExpanded} heading={item.question} key={index}>
                    {parse(item.answer)}
                  </AccordionItem>
                ))}
              </div>
            </div>
          ))}
        </div>
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
      </StyledWrapperContent>
    </StyledFaqContent>
  );
};

export default FaqContent;
