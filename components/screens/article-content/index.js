import StyledArticleContent from "./styled-article-content";
import StyledRawHtml from "@components/screens/common/raw-html/styled-raw-html";
import { useState, useEffect, useRef } from "react";
import getTagsArticle from "@lib/strapi/getTagsArticle";
import LeftMenu from "@components/screens/common/left-menu";
import StyledWrapperContent from "@components/screens/common/wrapper-content/styled-wrapper-content";
import parse from "html-react-parser";
import Heading from "@components/common/heading";
import Breadcrumbs from "@components/screens/common/breadcrumbs";
import Tag from "@components/common/tag";
import { tableBuilder } from "@utils/helpers/TableBuilder/table-builder";
import Tooltip from "@components/common/tooltip";
import ImagePopup from "./sub-components/image-popup";
import DownloadArea from "./sub-components/download-area";
import ConnectorsVideo from "./sub-components/connectors-video";
import ArticlePopup from "@components/screens/common/article-popup";
import AiChips from "@components/common/ai-chips";
import Cookies from "universal-cookie";
import ScrollToTopButton from "@components/screens/common/scroll-to-top-button";
import { handleFaqAccordionClick, handleImagePopupClick, handleTogglerClick, handleShortcutToggleClick, handleChangelogClick } from "@utils/handle-click-functions";
import { extractHeadings, handleArticleScroll } from "@utils/scroll-highlight-functions";

const ArticleContent = ({
  t,
  locale,
  categorySlug,
  categoryName,
  categoryUrl,
  level2CategoryName,
  level2CategoryUrl,
  level3CategoryName,
  level3CategoryUrl,
  level4CategoryName,
  level4CategoryUrl,
  pageName,
  pageDescription,
  tags,
  videos,
  leftMenuIsOpen,
  setLeftMenuIsOpen,
  leftMenuData,
  isAIGenerated
}) => {
  const containerRef = useRef(null);
  const wrapperContentRef = useRef(null);
  const leftMenuRef = useRef(null);
  const breadcrumbsRef = useRef(null);
  const headingRef = useRef(null);
  const tagsRef = useRef(null);
  const pageActionsRef = useRef(null);

  const [modalActive, setModalActive] = useState(false);
  const [imageModalActive, setImageModalActive] = useState(false);
  const [bigPhotoSrc, setBigPhotoSrc] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [tagName, setTagName] = useState();
  const [tagItems, setTagItems] = useState();
  const [hasMoreTags, setHasMoreTags] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [videoOffsetTrigger, setVideoOffsetTrigger] = useState(0);
  const [isPageActionsMenuOpen, setIsPageActionsMenuOpen] = useState(false);
  const cookies = new Cookies(null, { path: "/" });

  useEffect(() => {
    const groups = new Set(
      [...document.querySelectorAll('input[type="radio"]')].map(i => i.name)
    );

    groups.forEach(name => {
      const first = document.querySelector(`input[name="${name}"]`);
      if (first) first.checked = true;
    });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      tableBuilder(containerRef.current, cookies);

      if (containerRef.current.querySelectorAll("pre code")) {
        containerRef.current.querySelectorAll("pre code").forEach((element) => {
          const button = document.createElement("button");
          button.className = "copy-code-btn";
          button.addEventListener("click", () => {
            navigator.clipboard.writeText(element.textContent)

            const range = document.createRange();
            range.selectNodeContents(element);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
          });

          element.appendChild(button);
        });
      }

      containerRef.current.querySelectorAll("[id$='_block']").forEach((block) => {
        const heading = block.querySelector("h4");
        if (!heading || heading.querySelector(".anchor-copy-btn")) return;

        const btn = document.createElement("button");
        btn.className = "anchor-copy-btn";
        btn.title = t("CopyLink");
        btn.addEventListener("click", () => {
          const url = `${window.location.origin}${window.location.pathname}#${block.id}`;
          navigator.clipboard.writeText(url);
        });

        heading.appendChild(btn);
      });
    }

    setHeadings(extractHeadings(wrapperContentRef.current, pageDescription, "h4"));

    const getFullHeight = (element) => {
      if (!element) return 0;
      const offsetHeight = element.getBoundingClientRect().height;
      const style = window.getComputedStyle(element);
      return offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    };

    const breadcrumbsRefHeight = getFullHeight(breadcrumbsRef.current);
    const tagsRefHeight = getFullHeight(tagsRef.current);
    const headingRefHeight = getFullHeight(headingRef.current);
    const offsetTop = breadcrumbsRefHeight + tagsRefHeight + headingRefHeight + 8;

    const scrollHandler = () => {
      handleArticleScroll(true, wrapperContentRef.current, wrapperContentRef.current?.offsetHeight, leftMenuRef.current, offsetTop, "h4", setShowButton);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [videoOffsetTrigger, pageDescription]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pageActionsRef.current && !pageActionsRef.current.contains(event.target)) {
        setIsPageActionsMenuOpen(false);
      }
    };

    if (isPageActionsMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPageActionsMenuOpen]);

  const toggleAskMenu = () => setIsPageActionsMenuOpen((prev) => !prev);

  const openSidepanelWithQuery = (query) => {
    const submitToTextarea = () => {
      const textarea = document.querySelector(".DocSearch-Sidepanel-Prompt--textarea");
      if (!textarea) return false;

      const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      nativeSetter.call(textarea, query);
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      textarea.focus();

      setTimeout(() => {
        document.querySelector(".DocSearch-Sidepanel-Prompt--submit")?.click();
      }, 100);
      return true;
    };

    if (!document.querySelector(".DocSearch-Sidepanel-Container.is-open")) {
      document.querySelector(".DocSearch-SidepanelButton.floating")?.click();
    }

    if (!submitToTextarea()) {
      const observer = new MutationObserver(() => {
        if (submitToTextarea()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 3000);
    }

    setIsPageActionsMenuOpen(false);
  };

  const handleCopyPage = async () => {
    setIsPageActionsMenuOpen(false);

    try {
      await navigator.clipboard.writeText(containerRef.current?.innerText || "");
    } catch (error) {
      console.error("Failed to copy page:", error);
    }
  };

  const handleOpenInAI = (baseUrl) => {
    const prompt = t("OpenInAIPrompt", { url: window.location.href });
    window.open(`${baseUrl}?q=${encodeURIComponent(prompt)}`, "_blank", "noopener,noreferrer");
    setIsPageActionsMenuOpen(false);
  };

  const handleTagModal = async (tagName, preview) => {
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

  const handleClick = (event) => {
    handleFaqAccordionClick(event, containerRef.current);
    handleImagePopupClick(event, setBigPhotoSrc, setImageModalActive);
    handleTogglerClick(event);
    handleShortcutToggleClick(event);
    handleChangelogClick(event);
  };

  return (
    <StyledArticleContent>
      <StyledWrapperContent>
        <LeftMenu
          t={t}
          locale={locale}
          ref={leftMenuRef}
          pageName={pageName}
          headings={headings ? headings : []}
          leftMenuData={leftMenuData ? leftMenuData : []}
          leftMenuIsOpen={leftMenuIsOpen}
          setLeftMenuIsOpen={setLeftMenuIsOpen}
        />
        <div className="wrapper">
          <Breadcrumbs
            t={t}
            ref={breadcrumbsRef}
            categoryName={categoryName}
            categoryUrl={categoryUrl}
            level2CategoryName={level2CategoryName}
            level2CategoryUrl={level2CategoryUrl}
            level3CategoryName={level3CategoryName}
            level3CategoryUrl={level3CategoryUrl}
            level4CategoryName={level4CategoryName}
            level4CategoryUrl={level4CategoryUrl}
            pageName={pageName}
          />
          {isAIGenerated && <AiChips />}
          <div className="header-wrapper">
            <Heading ref={headingRef} className="wrapper-title" level={1}>{pageName}</Heading>
            <div
              id="page_actions"
              className={`dd-ask-button${isPageActionsMenuOpen ? " open" : ""}`}
              ref={pageActionsRef}
            >
              <button type="button" className="ask-button" onClick={() => openSidepanelWithQuery(t("AskQuestionsPrompt", { title: pageName, url: window.location.href }))}>
                <img src="https://static-helpcenter.onlyoffice.com/images/icons/ai-icon.react.svg" alt="" />
                <span className="label">{t("AskAIPlaceholder")}</span>
              </button>
              <button
                type="button"
                className="ask-button toggle"
                aria-haspopup="menu"
                aria-expanded={isPageActionsMenuOpen}
                aria-controls="split-menu"
                onClick={toggleAskMenu}
              >
                <img src="https://static-helpcenter.onlyoffice.com/images/icons/arrow-down.react.svg" alt="" className="arrow-icon" />
              </button>
              {isPageActionsMenuOpen && (
                <div id="split-menu" role="menu" className="split-menu">
                  <button role="menuitem" className="menu-item" onClick={() => openSidepanelWithQuery(t("SummarizePagePrompt", { title: pageName, url: window.location.href }))}>
                    <img src="https://static-helpcenter.onlyoffice.com/images/icons/ai-icon.react.svg" alt="" />
                    <span className="label">{t("SummarizePage")}</span>
                  </button>
                  <button role="menuitem" className="menu-item" onClick={handleCopyPage}>
                    <img src="https://static-helpcenter.onlyoffice.com/images/icons/copy.react.svg" alt="" />
                    <span className="label">{t("CopyPage")}</span>
                  </button>
                  <button role="menuitem" className="menu-item" onClick={() => handleOpenInAI("https://claude.ai/new")}>
                    <img src="https://static-helpcenter.onlyoffice.com/images/icons/claude.react.svg" alt="" />
                    <span className="label">{t("OpenInClaude")}</span>
                  </button>
                  <button role="menuitem" className="menu-item" onClick={() => handleOpenInAI("https://chat.openai.com/")}>
                    <img src="https://static-helpcenter.onlyoffice.com/images/icons/chatgpt.react.svg" alt="" />
                    <span className="label">{t("OpenInChatGPT")}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          {tags?.length > 0 &&
            <ul ref={tagsRef} className="tags">
              {tags?.map((item, index) => (
                <li key={index}>
                  <Tag onClick={() => handleTagModal(item.title)} name={item.title} />
                </li>
              ))}
            </ul>
          }
          <div ref={wrapperContentRef}>
            <StyledRawHtml onClick={handleClick} ref={containerRef}>{parse(pageDescription)}</StyledRawHtml>
            {videos && videos.length > 0 &&
              <ConnectorsVideo t={t} videos={videos} setVideoOffsetTrigger={setVideoOffsetTrigger} />
            }
          </div>
          <DownloadArea className="download-area" slug={categorySlug} subcat={level2CategoryName} locale={locale} />
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
          <ImagePopup
            t={t}
            image={bigPhotoSrc}
            active={imageModalActive}
            setActive={setImageModalActive}
          />
          <Tooltip />
        </div>
      </StyledWrapperContent>
      <ScrollToTopButton $showButton={showButton} />
    </StyledArticleContent>
  );
};

export default ArticleContent;