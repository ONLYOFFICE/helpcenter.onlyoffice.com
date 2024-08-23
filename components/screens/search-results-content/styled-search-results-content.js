import styled from "styled-components";
import Section from "@components/common/section";
import bgError from "@public/images/icons/bg-errors.react.svg";

const StyledSearchResultsContent = styled(Section)`
  overflow: hidden;

  .search-results-header {
    position: relative;
    padding: 56px 0;
    background-color: #f5f5f5;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100vw;
      height: 100%;
      background-color: #f5f5f5;
      transform: translateX(-100%);
    }

    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      z-index: -1;
      width: 100vw;
      height: 100%;
      background-color: #f5f5f5;
      transform: translateX(100%);
    }
  }

  .search-results-wrapper {
    padding: 40px 0 112px;
    margin: 0 auto;
    max-width: 832px;
    min-height: calc(100vh - 393px);

    &.not-found {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .search-results-found {
    margin-bottom: 40px;
    font-size: 14px;
    line-height: 21px;
    color: #808080;
    text-align: center;
  }

  .search-results-items {
    &:not(:last-child) {
      margin-bottom: 80px;
    }
  }

  .search-results-item {
    font-size: 14px;
    line-height: 21px;
    color: #444444;

    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }

  .search-results-link {
    color: #FF6F3D;

    &.main {
      margin: 8px 0;
      width: 100%;
      display: block;
      text-align: center;
    }

    &:not(:last-child) {
      margin-bottom: 8px;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  .search-results-description {
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 8px;
  }

  mark {
    background: #FFED90;
  }

  .search-results-not-found-title {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.3em;
    letter-spacing: -0.02em;
    text-align: center;
    color: #FF6F3D;
  }

  .search-results-not-found-img {
    width: 100%;
    height: 340px;
    background-image: url(${bgError.src});
    background-size: contain;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
`;

export default StyledSearchResultsContent;