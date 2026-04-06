import styled from "styled-components";
import Section from "@components/common/section";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledMainContent = styled(Section)`
  overflow: hidden;

  .info-content {
    position: relative;
    padding: 102px 0 112px;
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
    
    &.category-content {
      padding: 72px 0 0;

      @media ${device.mobile} {
        padding: 56px 0 0;
      }
    }

    @media ${device.mobile} {
      padding: 56px 0 48px;
    }
  }

  .info-content-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 48px;
  }

  .info-content-icon {
    margin-right: 16px;
    width: 80px;
    height: 80px;
    object-fit: contain;

    @media ${device.mobile} {
      width: 48px;
      height: 48px;
    }
  }

  .info-content-title {
    letter-spacing: -0.02em;
    text-align: center;

    @media ${device.mobile} {
      font-size: 28px;
      line-height: 37px;
    }
  }

  .info-content-search {
    margin-bottom: 80px;

    @media ${device.mobile} {
      margin-bottom: 55px;
    }
  }

  .guides-cards {
    background-color: ${globalColors.white};
    padding: 80px 0 112px;

    &.bg-gray {
      position: relative;
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

    .guides-cards-section {
      &:first-child {
        padding-bottom: 48px;
      }

       h2 {
        padding: 0 0 32px;
        text-align: center;
        }
    }

    @media ${device.laptop} {
      padding: 80px 0 88px;
    }

    @media ${device.mobile} {
      padding: 48px 0;
    }
  }

  .guides-cards-top {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px 48px;
    margin-bottom: 40px;

    @media ${device.mobile} {
      margin-bottom: 48px;
      gap: 24px 32px;
    }
  }

  .guides-cards-top-link {
    display: flex;
    align-items: center;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: ${globalColors.gray};
    text-decoration: none;
    transition: color 0.3s;

    img {
      margin-right: 8px;
      width: 16px;
      min-width: 16px;
      height: 16px;
      object-fit: contain;
    }

    &:hover {
      color: ${globalColors.orangeMain};
    }
  }

  .guides-cards-items {
    display: flex;
    gap: 32px;
  }
`;

export default StyledMainContent;