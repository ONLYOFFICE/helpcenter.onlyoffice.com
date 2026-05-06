import dynamic from "next/dynamic";
import "@docsearch/css/dist/sidepanel.css";
import { useState, useEffect, useRef, useCallback } from "react";
import StyledSearchArea from "./styled-algolia-ask";

const DocSearch = dynamic(
  () => import("@docsearch/core").then((m) => m.DocSearch),
  { ssr: false },
);

const Sidepanel = dynamic(
  () => import("@docsearch/sidepanel").then((m) => m.Sidepanel),
  { ssr: false },
);
const SidepanelButton = dynamic(
  () => import("@docsearch/sidepanel").then((m) => m.SidepanelButton),
  { ssr: false },
);

export default function AlgoliaAsk({ t, locale, $isLeftMenu, className }) {
  const iconRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [iconWidth, setIconWidth] = useState(0);
  const [placeholder, setPlaceholder] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSidepanelOpen, setIsSidepanelOpen] = useState(false);
  const [sidepanelKey, setSidepanelKey] = useState(0);

  const questions = [
    t("SearchInputQuestion1"),
    t("SearchInputQuestion2"),
    t("SearchInputQuestion3"),
    t("SearchInputQuestion4"),
    t("SearchInputQuestion5"),
  ];

  useEffect(() => {
    const currentQuestion = questions[questionIndex];

    if (!isDeleting && charIndex <= currentQuestion.length) {
      const timeout = setTimeout(() => {
        setPlaceholder(currentQuestion.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 60);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && charIndex > currentQuestion.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex >= 0) {
      const timeout = setTimeout(() => {
        setPlaceholder(currentQuestion.slice(0, charIndex));
        setCharIndex((prev) => prev - 1);
      }, 30);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex < 0) {
      setIsDeleting(false);
      setCharIndex(0);
      setQuestionIndex((prev) => (prev + 1) % questions.length);
    }
  }, [charIndex, isDeleting, questionIndex]);

  useEffect(() => {
    if (iconRef.current) {
      setIconWidth(iconRef.current.offsetWidth + 44);
    }
  });

  const onKeyDownHandle = async (e) => {
    if (e.key === "Enter") {
      if (!isSidepanelOpen) {
        const btn = document.querySelector(".DocSearch-SidepanelButton.floating");
        btn?.click();
        setIsSidepanelOpen(true);
      }
      handleAskAI(inputValue);
    }
  };

  useEffect(() => {
    if (!isSidepanelOpen) return;

    const timeout = setTimeout(() => {
      const closeBtn = document.querySelector(".DocSearch-Sidepanel-Action-close");
      if (closeBtn) {
        const handler = () => setIsSidepanelOpen(false);
        closeBtn.addEventListener("click", handler);
        return () => closeBtn.removeEventListener("click", handler);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [isSidepanelOpen]);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const setSidepanelInputValue = useCallback((value) => {
    const trySetInput = () => {
      const textarea = document.querySelector(".DocSearch-Sidepanel-Prompt--textarea");

      if (textarea) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype,
          "value"
        ).set;
        nativeSetter.call(textarea, value);
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        textarea.focus();

        setTimeout(() => {
          const submitButton = document.querySelector(".DocSearch-Sidepanel-Prompt--submit");
          submitButton?.click();
        }, 100);
        return true;
      }
      return false;
    };

    if (!trySetInput()) {
      const observer = new MutationObserver(() => {
        if (trySetInput()) {
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => observer.disconnect(), 3000);
    }
  }, []);

  const handleAskAI = (value) => {
    if (!isSidepanelOpen) {
      const btn = document.querySelector(".DocSearch-SidepanelButton.floating");
      btn?.click();
      setIsSidepanelOpen(true);
    }
    setSidepanelKey(prev => prev + 1);
    setTimeout(() => setSidepanelInputValue(value), 200);
  };

  return (
    <DocSearch>
      <StyledSearchArea
        $isLeftMenu={$isLeftMenu}
        className={`search-area ${className ? className : ""}`}
        $iconWidth={iconWidth}
      >
        <div className="search-icon search" ref={iconRef}>{!$isLeftMenu && <span>{t("AIHelp")}</span>}<img src={"/images/icons/ai-search.react.svg"} /></div>
        <input
          onChange={handleSearchInput}
          onKeyDown={onKeyDownHandle}
          className="search-input"
          placeholder={inputValue ? "" : placeholder}
          value={inputValue}
          type="text"
        />
        {inputValue && (
          <button
            onClick={() => setInputValue("")}
            className="search-icon cross"
          ></button>
        )}
      </StyledSearchArea>
      <SidepanelButton />
      <Sidepanel
        key={sidepanelKey}
        appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}
        getToken={async () => {
          const res = await fetch("/api/ask-ai/token", { method: "POST", body: JSON.stringify({ locale: locale }) });
          const data = await res.json();
          return data.token;
        }}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
        assistantId={process.env.NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID}
        apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY}
        searchParameters={{
          facetFilters: [`locale:${locale}`],
          distinct: false,
        }}
        initialQuery={inputValue}
        translations={{
          newConversationScreen: {
            titleText: t("AskAIHeader"),
            introductionText: t("AskAIIntroduction"),
          },
          promptForm: {
            promptDisclaimerText: t("AskAIMistakes"),
            promptPlaceholderText: t("AskAIPlaceholder"),
          },
        }}
      />
    </DocSearch>
  );
}
