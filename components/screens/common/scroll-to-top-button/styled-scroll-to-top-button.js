import styled from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledScrollToTopButton = styled.div`
  box-sizing: border-box;
  position: sticky;
  top: calc(100% - 80px);
  right: 0;
  margin-bottom: 112px;
  margin-right: -32px;
  width: 32px;
  height: 32px;
  z-index: 999;
  opacity: ${(props) => (props.$showButton ? 1 : 0)};
  visibility: ${(props) => (props.$showButton ? "visible" : "hidden")};

  button {
    display: inline-flex;
    border: 1px solid ${globalColors.veryLightGrey};
    border-radius: 3px;
    padding: 0;
    margin-left: 40px;
    width: 32px;
    height: 32px;
    background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/arrow-gray.react.svg");
    background-position: center center;
    background-repeat: no-repeat;
    background-color: ${globalColors.grayTextInputHover};
    transform: rotate(270deg);
    cursor: pointer;

    @media (max-width: 1288px) {
      margin-left: 4px;
    }

    @media ${device.laptop} {
      border-radius: 2px;
      width: 24px;
      height: 24px;
    }

    @media ${device.mobile} {
      border: none;
      border-radius: 4px;
      margin-left: 0;
      width: 40px;
      height: 40px;
      background-color: rgba(128, 128, 128, 0.32);
      background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/arrow-white.react.svg");
      transform: rotate(0);
    }
  }

  @media ${device.laptop} {
    margin-right: -24px;
    width: 24px;
    height: 24px;
  }

  @media ${device.mobile} {
    position: fixed;
    top: initial;
    right: 24px;
    bottom: 24px;
    margin: 0;
  }
`;

export default StyledScrollToTopButton;
