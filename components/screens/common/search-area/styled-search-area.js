import styled, { css } from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledSearchArea = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 766px;
  display: flex;
  gap: 16px;

  .ask-ai-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background-color: #f1fbff;
    height: 64px;
    width: fit-content;
    color: #333333;
    border-radius: 32px;
    padding: 20px 28px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;

    > span {
      width: max-content;
    }

    @media ${device.mobile} {
      font-size: 14px;
      height: 48px;
    }
  }

  .ask-ai-button::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 1px;
    border-radius: 32px;
    background: linear-gradient(100.05deg, #71c4ff 14.53%, #666666 88.53%);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .ask-ai-button-icon {
    width: 16px;
    height: 16px;
    background: url("https://static-helpcenter.onlyoffice.com/images/icons/ask-ai.react.svg") no-repeat center / contain;
  }

  .input-container {
    max-width: 624px;
    position: relative;
    width: 100%;
  }

  .search-input-area {
    position: relative;
    width: 100%;
  }

  .search-input {
    box-sizing: border-box;
    border: 1px solid ${globalColors.grayLight};
    border-radius: ${(props) => (props.isLeftMenu ? "24px" : "32px")};
    padding: ${(props) => props.isLeftMenu ? "14px 16px 14px 48px" : "20px 64px 20px 28px"};
    font-size: ${(props) => (props.isLeftMenu ? "14px" : "16px")};
    line-height: ${(props) => (props.isLeftMenu ? "20px" : "24px")};
    width: 100%;
    height: ${(props) => (props.isLeftMenu ? "48px" : "64px")};
    outline: none;

    &::placeholder {
      color: ${(props) => props.isLeftMenu ? globalColors.grayLight : globalColors.textGray};
    }

    @media ${device.laptop} {
      ${(props) =>
        props.isLeftMenu &&
        css`
          padding: 14px 16px 14px 48px;
          line-height: 20px;
          height: 48px;
          background-color: ${globalColors.grayTextInputHover};
        `}
    }

    @media ${device.mobile} {
      ${(props) =>
        !props.isLeftMenu &&
        css`
          border-radius: 24px;
          padding: 13px 48px 13px 16px;
          font-size: 14px;
          line-height: 20px;
          height: 48px;
        `}
    }
  }

  .search-icon {
    position: absolute;
    top: 50%;
    ${(props) => (props.isLeftMenu ? "left: 16px;" : "right: 24px;")};
    border: none;
    padding: 0;
    width: ${(props) => (props.isLeftMenu ? "24px" : "16px")};
    height: ${(props) => (props.isLeftMenu ? "24px" : "16px")};
    background-repeat: no-repeat;
    background-size: contain;
    background-color: transparent;
    transform: translateY(-50%);
    outline: none;

    &.cross {
      background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/close-icon.react.svg");
      cursor: pointer;
    }

    &.search {
      background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/search.react.svg");
    }

    @media ${device.laptop} {
      ${(props) =>
        props.isLeftMenu &&
        css`
          width: 24px;
          height: 24px;
        `}
    }

    @media ${device.mobile} {
      ${(props) =>
        !props.isLeftMenu &&
        css`
          right: 16px;
        `}
    }
  }
`;
export default StyledSearchArea;
