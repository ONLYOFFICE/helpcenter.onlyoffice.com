import styled from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledWrapperContent = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;

  .wrapper {
    box-sizing: border-box;
    padding: 32px 0 112px 32px;
    width: 100%;
    max-width: 864px;
    color: ${globalColors.gray};
    background-color: #fff;
    
    @media ${device.laptop} {
      padding: 32px 0 64px;
    }
  }

  .wrapper-title {
    margin-bottom: 24px;
    font-size: 24px;
    line-height: 32px;

    &.subcategory-heading {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    @media ${device.mobile} {
      font-size: 20px;
      line-height: 27px;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
    list-style-type: none;
  }

  .reqs {
    display: flex;
    gap: 8px;
    text-decoration: underline;
  }

  .top-links {
    gap: 32px;
    padding: 0 0 32px;
  }

  .changelog-page {
    &.docs-log {
      .changelog-switcher .changelog-subheader {
        font-size: 14px;
        font-weight: 400;
        padding: 16px 0 0;
      }
    }
    a {
      color: ${globalColors.orangeMain};
      &:hover, &:visited {
        color: ${globalColors.orangeMain};
      }
    }

    .changelog-main-header {
      position: relative;
      cursor: pointer;
      display: flex;
      font-size: 18px;
      font-weight: 600;
      line-height: 23.94px;
      letter-spacing: -0.02em;
      margin: 0;
      text-align: left;

      &:before {
        content: url("https://static-helpcenter.onlyoffice.com/images/icons/plus.react.svg");
        display: inline-block;
        margin-right: 10px;
        width: 24px;
        height: 24px;
      }

      &.active {
          &:before {
            content: url("https://static-helpcenter.onlyoffice.com/images/icons/minus.react.svg");
          }
        }
    }
    .changelog-release-date {
      float: right;
      margin: -24px 0px 0;

      .crd-date {
        color: ${globalColors.orangeMain};
      }
    }

    .changelog-switcher {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s;

      .changelog-subheader {
        font-size: 18px;
        font-weight: 600;
        padding: 24px 0 16px;
        margin: 0;

        a {
          color: ${globalColors.orangeMain};
        }
      }

      .bigVideoCont {
        position: relative;
        border: none;
        display: block;
        margin-top: 24px;
        padding-bottom: 44.445%;
        width: 80%;

        iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media ${device.mobile} {
          padding-bottom: 56.25%;
          width: 100%;
        }
      }

      > ul {
        padding: 0 0 24px 16px;

        &:last-child {
          padding: 0 0 0px 16px;
        }
      }

      .changelog-subsubheader {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        padding: 0 0 8px;
      }
    }

    .changelog-version-block {
      border-bottom: 1px solid ${globalColors.bgGray};
      padding: 32px 0;
    }
  }

  .question_answer p span {
    color: ${globalColors.orangeLetters};
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    margin: 0 8px 0 0;

    &.answer {
      color: #5b9c18;
    }
  }

  .question_answer a {
    color: ${globalColors.orangeMain};
  }

  .category-articles-item {
    display: flex;
    gap: 8px;

    &:not(:last-child) {
      //margin-bottom: 16px;
    }

    a {
      color: ${globalColors.orangeMain};
      transition: color 0.3s;
      text-decoration: underline;

      &:hover {
        text-decoration: none;
      }
    }
  }
`;

export default StyledWrapperContent;
