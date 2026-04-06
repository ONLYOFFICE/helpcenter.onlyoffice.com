import styled, { css } from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledSearchArea = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 720px;

  .input-container {
    position: relative;
    width: 100%;
  }

  .search-input {
    box-sizing: border-box;
    border: 1px solid ${globalColors.grayLight};
    border-radius: ${(props) => (props.$isLeftMenu ? "24px" : "32px")};
    padding: ${(props) => props.$isLeftMenu ? "14px 40px 14px 48px" : "20px 64px 20px 132px"};
    font-size: ${(props) => (props.$isLeftMenu ? "14px" : "16px")};
    line-height: ${(props) => (props.$isLeftMenu ? "20px" : "24px")};
    width: 100%;
    height: ${(props) => (props.$isLeftMenu ? "50px" : "64px")};
    outline: none;
     ${(props) =>
        !props.$isLeftMenu && props.$iconWidth &&
        css`
          padding-left: ${(props) => props.$iconWidth ? `${props.$iconWidth}px` : '132px'} !important;
        `}

    &::placeholder {
      color: ${(props) => props.$isLeftMenu ? globalColors.grayLight : globalColors.textGray};
    }

    @media ${device.laptop} {
      ${(props) =>
        props.$isLeftMenu &&
        css`
          padding: 14px 16px 14px 48px;
          line-height: 20px;
          height: 48px;
          background-color: ${globalColors.grayTextInputHover};
        `}
    }

    @media ${device.mobile} {
      ${(props) =>
        !props.$isLeftMenu &&
        css`
          border-radius: 24px;
          padding: ${(props) => props.$isLeftMenu ? "13px 48px 13px 16px" : "13px 40px 13px 112px"};
          font-size: 14px;
          line-height: 20px;
          height: 48px;
        `}
    }
  }

  .search-icon {
    position: absolute;
    top: 50%;
    border: none;
    padding: 0;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: transparent;
    transform: translateY(-50%);
    outline: none;
    height: 24px;

    &.cross {
      background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/close-icon.react.svg");
      cursor: pointer;
      right: ${(props) => (props.$isLeftMenu ? "16px" : "24px")};
      width: ${(props) => (props.$isLeftMenu ? "24px" : "16px")};
      height: ${(props) => (props.$isLeftMenu ? "24px" : "16px")};

    @media ${device.mobile} {
            right: 16px;
        }
    }

    &.search {
      left: ${(props) => (props.$isLeftMenu ? "16px" : "28px")};
      width: ${(props) => (props.$isLeftMenu ? "24px" : "fit-content")};
      display: flex;
      gap: 8px;

      > span {
        color: #333;
        font-weight: 600;
        font-size: 16px;
        line-height: 1.5em;
      }


    @media ${device.mobile} {
        left: 16px;
      }
    }
  }
`;
export default StyledSearchArea;
