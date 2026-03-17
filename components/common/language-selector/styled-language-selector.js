import styled from "styled-components";
import globalColors from "@components/utils/global-colors";

const StyledLanguageSelector = styled.div`
  position: relative;

  .language-button {
    position: relative;
    display: flex;
    align-items: center;
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;

    &:hover {
      .language-link {
        background-position-y: -40px;
      }
    }

    &:after {
      content: "";
      display: inline-flex;
      margin-left: 4px;
      width: 8px;
      height: 6px;
      background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/arrow-drop-down.react.svg");
      background-repeat: no-repeat;
      background-position-x: -8px;
      background-position-y: -8px;
      transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "")};
      transition: 0.3s;
    }
  }

  .language-list {
    position: absolute;
    top: 40px;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 24px;
    background-color: ${globalColors.white};
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px;
    z-index: 100;
    list-style-type: none;
  }

  .language-item {
    &:not(:last-child) {
      margin-bottom: 16px;
    }

    .language-item-link {
      display: flex;
      gap: 8px;

      > b {
        color: ${globalColors.grayMain};
        text-transform: uppercase;
        width: 41px;
      }

      &.active {
        color: ${globalColors.orangeMain};

        > b {
          color: ${globalColors.orangeMain};
        }
      }
    }
  }

  .language-link {
    display: flex;
    width: 24px;
    height: 24px;
    background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/globe.react.svg");
    background-repeat: no-repeat;
    background-position-y: ${(props) => (props.$isOpen ? "-40px" : "0px")};
  }
`;

export default StyledLanguageSelector;
