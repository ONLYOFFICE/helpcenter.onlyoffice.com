import styled from "styled-components";
import Section from "@components/common/section";
import globalColors from "@components/utils/global-colors";

const StyledSearchResultsContent = styled(Section)`
  overflow: hidden;

  .search-results-header {
    position: relative;
    padding: 56px 0;
    background-color: ${globalColors.bgGray};

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100vw;
      height: 100%;
      background-color: ${globalColors.bgGray};
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
      background-color: ${globalColors.bgGray};
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
    color: ${globalColors.textGray};
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
    color: ${globalColors.grayMain};

    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }

  .search-breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 0px;
    margin-bottom: 8px;

    .search-crumb,
    .breadcrumb-separator {
      background-color: #efefef;
      padding: 4px 5px;
    }

    .search-crumb {
      color: #666666;
      font-size: 13px;
    }

    .search-crumb:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }

    .search-crumb:last-of-type {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }

  .search-results-link {
    color: ${globalColors.orangeMain};

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
    background: #ffed90;
  }

  .search-results-not-found-title {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.3em;
    letter-spacing: -0.02em;
    text-align: center;
    color: ${globalColors.orangeMain};
  }

  .search-results-not-found-img {
    width: 100%;
    height: 340px;
    background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/bg-errors.react.svg");
    background-size: contain;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
`;

export default StyledSearchResultsContent;
