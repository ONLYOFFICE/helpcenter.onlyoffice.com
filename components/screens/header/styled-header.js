import styled from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 40px;
  min-height: 72px;
  background-color: ${globalColors.gray};

  .header-container {
    display: flex;
    align-items: center;
    margin: 0 auto;
    width: 100%;
    max-width: 1120px;

    @media ${device.laptop} {
      justify-content: space-between;
    }

    @media ${device.mobile} {
      justify-content: initial;
    }
  }

  .header-mobile-toggle-btn {
    display: none;
    border: none;
    padding: 0;
    width: 24px;
    height: 24px;
    background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/mob_menu_white.react.svg");
    background-color: transparent;
    cursor: pointer;

    &.is-main {
      @media ${device.mobile} {
        display: none;
      }
    }

    @media ${device.laptop} {
      display: inline-flex;
    }

    @media ${device.mobile} {
      margin-right: 32px;
    }
  }

  .logo {
    width: 186px;
    min-width: 186px;
    height: 32px;
    background-image: url("https://static-helpcenter.onlyoffice.com/images/logo/logowhite.react.svg");
    background-repeat: no-repeat;
    overflow: hidden;

    @media ${device.laptopM} {
      width: 35px;
      min-width: 35px;
    }

    @media ${device.laptop} {
      position: absolute;
      left: 50%;
      width: 186px;
      min-width: 186px;
      transform: translateX(-50%);
    }

    @media ${device.mobile} {
      position: initial;
      left: initial;
      margin-right: auto;
      width: 31px;
      min-width: 31px;
      height: 28px;
      background-image: url("https://static-helpcenter.onlyoffice.com/images/logo/logo-mobile.react.svg");
      transform: initial;
    }
  }

  .header-mobile-menu-btn {
    display: none;
    align-items: center;
    border: none;
    padding: 0;
    margin-right: 24px;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.04em;
    color: ${globalColors.white};
    background-color: transparent;
    text-transform: uppercase;
    word-break: break-word;
    cursor: pointer;

    &:after {
      content: "";
      display: inline-flex;
      width: 24px;
      height: 24px;
      background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/arrow-drop-down.react.svg");
      background-repeat: no-repeat;
      transform: rotate(-90deg);
    }

    &.open {
      &:after {
        transform: rotate(0);
      }
    }

    &.active {
      color: ${globalColors.orangeMain};
    }

    @media ${device.mobile} {
      display: inline-flex;
    }
  }

  .nav {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding-left: 8px;
    padding-right: 22px;
    margin: 0 auto;
    z-index: 11;

    &.open {
      opacity: 1;
      visibility: visible;
    }

    @media ${device.laptopM} {
      padding-left: 45px;
      padding-right: 8px;
    }

    @media ${device.laptop} {
      position: absolute;
      top: 100%;
      left: 0;
      padding: 16px 0 18px;
      width: 100%;
      opacity: 0;
      visibility: hidden;
      background-color: ${globalColors.gray};
    }
  }

  .nav-list {
    display: flex;
    align-items: center;
    list-style-type: none;

    @media ${device.laptop} {
      flex-direction: column;
      align-items: end;
    }
  }

  .nav-item {
    &:not(:last-child) {
      margin-right: 8px;

      @media ${device.laptop} {
        margin-right: 0;
        margin-bottom: 24px;
      }
    }

    @media ${device.laptop} {
      width: 100%;
    }
  }

  .nav-link {
    display: flex;
    border-bottom: 1px solid transparent;
    padding: 27px 16px 26px;
    font-size: ${(props) => (props.$locale === "de" ? "12px" : "13px")};
    font-weight: 600;
    line-height: 18px;
    letter-spacing: 0.04em;
    color: ${globalColors.white};
    text-transform: uppercase;
    transition:
      border-color 0.3s,
      color 0.3s;

    @media ${device.laptopM} {
      font-size: ${(props) => (props.$locale === "de" ? "11px" : "13px")};
    }

    &:after {
      @media ${device.laptop} {
        content: "";
        display: inline-flex;
        margin-left: 8px;
        width: 11px;
        height: 11px;
        background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/chevron-right.react.svg");
        background-repeat: no-repeat;
      }

      @media ${device.mobile} {
        content: none;
      }
    }

    &.active {
      color: ${globalColors.orangeMain};
      border-color: ${globalColors.orangeMain};

      @media ${device.laptop} {
        border-color: ${globalColors.orangeMain};
      }
    }

    &:hover {
      border-color: ${globalColors.orangeMain};
      color: ${globalColors.orangeMain};
    }

    @media ${device.laptop} {
      justify-content: end;
      border-bottom: initial;
      padding: 0 85px 0 16px;
      color: ${globalColors.white};
    }
  }

  @media ${device.tablet} {
    padding: 0 40px;
  }

  @media ${device.mobile} {
    padding: 0 16px;
    min-height: 56px;
  }
`;

export default StyledHeader;
