import styled from "styled-components";
import Section from "@components/common/section";
import { device } from "@components/utils/devices";

const StyledArticleContent = styled(Section)`
  .section-page {
    display: flex;

    .anchor-copy-btn {
      border: none;
      padding: 0;
      width: 24px;
      height: 24px;
      background-image: url(/_next/static/media/copy.e7f8d68a.svg);
      background-repeat: no-repeat;
      background-size: 12px 12px;
      background-position: center;
      background-color: transparent;
      cursor: pointer;
      position: relative;
      top: 5px;
      right: 0;
    }

    .header-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 32px;

      @media ${device.mobile} {
        flex-direction: column;
        gap: 0;
      }

      .dd-ask-button {
        margin-bottom: 24px;
        align-items: center;
        display: inline-flex;
        position: relative;
        
          @media ${device.mobile} {
            margin-bottom: 0px;
          }

        &.open .toggle .arrow-icon {
          transform: rotate(180deg);
        }
      }

      .ask-button {
        font: inherit;
        border: 1px solid transparent;
        border-right-color: #808080;
        cursor: pointer;
        white-space: nowrap;
        background: #f5f5f5;
        border-radius: 4px 0 0 4px;
        align-items: center;
        padding: 4px 12px 5px;
        font-size: 14px;
        line-height: 21px;
        display: flex;
        gap: 8px;

        &.toggle {
          border-left: 0;
          border-radius: 0 4px 4px 0;
        border-right-color: transparent;
          padding: 7px;
        }

        > img {
          width: 16px;
          height: 16px;
        }

        .arrow-icon {
          transition: transform 0.15s ease;
        }
      }

      #split-menu {
        position: absolute;
        top: calc(100% + 4px);
        right: 0;
        z-index: 10;
        min-width: 200px;
        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        padding: 4px;
        display: flex;
        flex-direction: column;

        .menu-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: none;
          background: transparent;
          font: inherit;
          font-size: 14px;
          line-height: 21px;
          text-align: left;
          color: inherit;
          cursor: pointer;
          border-radius: 4px;
          white-space: nowrap;

          &:hover {
            background: #f5f5f5;
          }

          img {
            width: 16px;
            height: 16px;
            flex-shrink: 0;
          }
        }
      }
    }
  }
`;

export default StyledArticleContent;
