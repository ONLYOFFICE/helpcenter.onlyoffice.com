import StyledSearchArea from "./styled-search-area";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import AlgoliaAskAI from "@components/common/algolia-ask";

const SearchArea = ({ query, className, placeholder, isLeftMenu }) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/searchresult") {
      setInputValue(query || "");
    }
  }, [query]);

  const onKeyDownHandle = async (e) => {
    if (e.key === "Enter") {
      router.push({
        pathname: "/searchresult",
        query: { query: inputValue }
      });
    }
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  return (
    <StyledSearchArea
      isLeftMenu={isLeftMenu}
      className={`search-area ${className ? className : ""}`}
    >
      <input
        onChange={handleSearchInput}
        onKeyDown={onKeyDownHandle}
        className="search-input"
        placeholder={placeholder}
        value={inputValue}
        type="text"
      />
      {inputValue ? (
        <button onClick={() => setInputValue("")} className="search-icon cross"></button>
      ) : (
        <div className="search-icon search"></div>
      )}
      {!isLeftMenu && <AlgoliaAskAI locale={router.locale} key={router.locale} />}
    </StyledSearchArea>
  );
};

export default SearchArea;
