import StyledLanguageSelector from "./styled-language-selector";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import languages from "@config/languages";
import InternalLink from "../internal-link";

const LanguageSelector = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".language-selector")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <StyledLanguageSelector isOpen={isOpen} className="language-selector">
      <button onClick={() => setIsOpen(!isOpen)} className="language-button">
        <span className={`language-link ${locale}`}></span>
      </button>
      {isOpen &&
        <ul className="language-list">
          {languages.map((language) => (
            <li className="language-item" key={language.key}>
              <InternalLink
                onClick={() => { setIsOpen(false); setLang(language.shortKey) }}
                className={`language-item-link ${lang === language.shortKey ? "active" : ""}`}
                href={router.asPath}
                locale={language.shortKey}>
                <b>{language.shortKey}</b>
                <p>{language.name}</p>
              </InternalLink>
            </li>
          ))}
        </ul>
      }
    </StyledLanguageSelector>
  );
};

export default LanguageSelector;
