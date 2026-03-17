import styled from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledLeftMenu = styled.div`
  box-sizing: border-box;
  position: relative;
  border-right: 1px solid ${globalColors.tagColor};
  padding: 32px 24px 32px 0;
  width: 256px;
  min-width: 256px;
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

  .left-menu-wrapper {
    position: sticky;
    top: 104px;

    @media ${device.laptop} {
      position: initial;
      top: initial;
    }
  }

  .left-menu-search {
    margin-bottom: 32px;

    @media ${device.laptop} {
      margin-bottom: 24px;
    }
  }

  .left-menu-title {
    margin-bottom: 8px;
    padding: 8px 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 19px;
    color: ${globalColors.gray};
    text-transform: uppercase;

    @media ${device.laptop} {
      padding: 10px 0;
    }
  }

  .left-menu-treeview {
    margin-bottom: 32px;
  }

  .left-menu-items {
    margin-bottom: 32px;
    list-style-type: none;

    > li {
      &:last-child {
        margin-bottom: 32px;

        @media ${device.laptop} {
          margin-bottom: 24px;
        }
      }
    }

    &.left-menu-articles {
      position: relative;

      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 2px;
        width: 4px;
        height: 100%;
        background-color: ${globalColors.tagHover};
      }

      li {
        &.active {
          position: relative;

          a {
            font-weight: 600;
            color: ${globalColors.orangeMain};
          }

          &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 2px;
            width: 4px;
            height: 100%;
            background-color: ${globalColors.orangeMain};
          }
        }

        &:first-child {
          margin-top: 8px;
        }
      }

      a {
        display: block;
        padding: 6px 0 6px 32px;
        font-size: 14px;
        line-height: 21px;
        transition: color 0.3s;

        &:hover {
          color: ${globalColors.orangeMain};
        }
      }
    }
  }

  .left-menu-info {
    list-style-type: none;

    li {
      &:not(:last-child) {
        margin-bottom: 24px;
      }
    }

    a {
      display: flex;
      align-items: center;
      transition: color 0.3s;

      &:before {
        margin-right: 8px;
        width: 24px;
        height: 24px;
      }

      &.glossary {
        &::before {
          content: url("https://static-helpcenter.onlyoffice.com/images/icons/glossary-icon.react.svg");
        }
      }

      &.video {
        &::before {
          content: url("https://static-helpcenter.onlyoffice.com/images/icons/video-icon.react.svg");
        }
      }

      &.faq {
        &::before {
          content: url("https://static-helpcenter.onlyoffice.com/images/icons/faq-icon.react.svg");
        }
      }

      &.active {
        color: ${globalColors.orangeMain};
      }

      &:hover {
        color: ${globalColors.orangeMain};
      }

      @media ${device.laptop} {
        padding: 4px 0;
      }
    }
  }

  @media ${device.laptop} {
    position: fixed;
    top: 0;
    left: 0;
    border-right: none;
    padding: 24px 24px 24px 16px;
    width: 272px;
    min-width: 272px;
    height: 100%;
    z-index: 1000;
    transform: translateX(-100%);
    visibility: hidden;
    transition: ${(props) => props.$isTransition && "transform 0.3s, visibility 0.3s"};

    &.active {
      transform: translateX(0);
      visibility: visible;
    }
  }

  .ScrollbarsCustom {
    height: calc(100vh - 253px) !important;

    &.scroll-visible {
      .ScrollbarsCustom-Track.ScrollbarsCustom-TrackY {
        opacity: 1;
        visibility: visible;
      }
    }

    @media ${device.laptop} {
      height: calc(100vh - 120px) !important;
    }
  }

  .ScrollbarsCustom-Wrapper {
    inset: 0 !important;
  }

  .ScrollbarsCustom-Track.ScrollbarsCustom-TrackY {
    border-radius: 2px !important;
    top: 0 !important;
    right: -12px !important;
    width: 4px !important;
    height: 100% !important;
    background-color: ${globalColors.tagHover} !important;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;

    @media ${device.laptop} {
      right: -20px !important;
    }
  }

  .ScrollbarsCustom-Thumb.ScrollbarsCustom-ThumbY {
    border-radius: 2px !important;
    width: 4px !important;
    background-color: ${globalColors.veryLightGrey} !important;
  }
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.24);
  z-index: 10;
  opacity: ${(props) => props.$leftMenuIsOpen ? 1 : 0};
  visibility: ${(props) => props.$leftMenuIsOpen ? "visible" : "hidden"};
  transition: ${(props) => props.$isTransition && "opacity 0.3s, visibility 0.3s"};
`;

export { StyledLeftMenu, StyledOverlay };
