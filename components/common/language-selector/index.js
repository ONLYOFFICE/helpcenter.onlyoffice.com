import StyledLanguageSelector from "./styled-language-selector";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import languages from "@config/languages";
import InternalLink from "../internal-link";

const LanguageSelector = ({ locale }) => {
  const [isOpen, setIsOpen] = useState(false);
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
        <img
          className="flag-image"
          src={`https://static-helpcenter.onlyoffice.com/images/flags/${locale}.react.svg`}
          width="24px"
          height="24px"
          alt="flag"
        />
      </button>
      {isOpen &&
        <ul className="language-list">
          {languages.map((language) => (
            <li className="language-item" key={language.key}>
              <InternalLink
                onClick={() => setIsOpen(false)}
                className="language-link"
                href={router.asPath}
                locale={language.shortKey}
              >
                <img
                  src={`https://static-helpcenter.onlyoffice.com/images/flags/${language.shortKey}.react.svg`}
                  width="24px"
                  height="24px"
                  alt="flag"
                />
              </InternalLink>
            </li>
          ))}
        </ul>
      }
    </StyledLanguageSelector>
  );
};

export default LanguageSelector;
