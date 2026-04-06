import { StyledLeftMenu, StyledOverlay } from "./styled-left-menu";
import { forwardRef, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Scrollbar } from "react-scrollbars-custom";
import InternalLink from "@components/common/internal-link";
import AlgoliaAsk from "@components/common/algolia-ask";
import Heading from "@components/common/heading";
import TreeView from "@components/screens/common/left-menu/sub-components/treeview";

const LeftMenu = forwardRef(({
  t,
  locale,
  pageName,
  headings,
  leftMenuIsOpen,
  setLeftMenuIsOpen,
  leftMenuData
}, ref) => {
  const router = useRouter();
  const timeoutRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const scrollTopTimeoutRef = useRef(null);
  const treeViewRef = useRef(null);
  const shouldObserve = useRef(true);
  const [scrollVisible, setScrollVisible] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const [scrollTopHeight, setScrollTopHeight] = useState(undefined);

  const handleVisibility = () => {
    setScrollVisible(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setScrollVisible(false), 2000);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = setTimeout(() => setIsTransition(true), 50);
        setLeftMenuIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    const calculateOffsetTop = () => {
      if (!shouldObserve.current) return;

      if (treeViewRef.current) {
        const activeLink = treeViewRef.current.querySelector(".left-menu-level-link.active");

        if (activeLink) {
          setScrollTopHeight(activeLink.offsetTop - window.innerHeight / 5);
          clearTimeout(scrollTopTimeoutRef.current);
          scrollTopTimeoutRef.current = setTimeout(() => setScrollTopHeight(undefined), 50);
        }
      }
    };

    const observer = new MutationObserver(() => {
      if (shouldObserve.current) calculateOffsetTop();
    });

    if (treeViewRef.current) {
      observer.observe(treeViewRef.current, {
        childList: true,
        subtree: true,
      });
    };

    calculateOffsetTop();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(transitionTimeoutRef.current);
      clearTimeout(scrollTopTimeoutRef.current);
      if (treeViewRef.current) {
        observer.disconnect();
      }
    };
  }, [router.asPath]);

  return (
    <>
      <StyledLeftMenu
        ref={ref}
        onMouseEnter={handleVisibility}
        onMouseLeave={() => setScrollVisible(false)}
        $isTransition={isTransition}
        className={`left-menu ${leftMenuIsOpen ? "active" : ""}`}
      >
        <div className="left-menu-wrapper">
          <AlgoliaAsk
            className="left-menu-search"
            $isLeftMenu={true}
            t={t}
            locale={locale}
          />
          <Scrollbar scrollTop={scrollTopHeight} onScroll={handleVisibility} className={scrollVisible ? "scroll-visible" : ""}>
            {headings && headings.length !== 0 && pageName && (
              <Heading className="left-menu-title" level={6} label={pageName} />
            )}
            {headings?.length > 1 ? (
              <ul className="left-menu-items left-menu-articles">
                {headings.map((item, index) => (
                  <li className={index === 0 ? "active" : ""} key={index}>
                    <InternalLink onClick={() => setLeftMenuIsOpen(false)} href={`#${item.id}`} label={item.text} />
                  </li>
                ))}
              </ul>
            ) : leftMenuData?.data?.length > 0 ? (
              <TreeView
                ref={treeViewRef}
                data={leftMenuData}
                setIsTransition={setIsTransition}
                shouldObserve={shouldObserve}
              />
            ) : null}
            <ul className="left-menu-info">
              <li><InternalLink href="/glossary.aspx" className={`glossary ${router.pathname === "/glossary.aspx" ? "active" : ""}`} label={t("Glossary")} /></li>
              <li><InternalLink href="/video.aspx" className={`video ${router.pathname === "/video.aspx" ? "active" : ""}`} label={t("Video")} /></li>
              <li><InternalLink href="/faq/faq.aspx" className={`faq ${`/faq/${router.query.faq}` === "/faq/faq.aspx" ? "active" : ""}`} label={t("FAQ")} /></li>
            </ul>
          </Scrollbar>
        </div>
      </StyledLeftMenu>
      <StyledOverlay $leftMenuIsOpen={leftMenuIsOpen} $isTransition={isTransition} />
    </>
  );
});

export default LeftMenu;