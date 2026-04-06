import styled from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledGuidesCell = styled.div`
  border-radius: 3px;
  width: 544px;
  background-color: ${globalColors.white};
  box-shadow: rgba(85, 85, 85, 0.15) 0px 7px 25px;
  margin-bottom: ${(props) => (props.$isCategoryPage ? "32px" : "24px")};

  &:last-child {
    margin-bottom: 0;
  }

  .guides-cell-header {
    border-bottom: 1px solid ${globalColors.grayLight};
    display: flex;
    flex-direction: column;
    padding: 32px;

    &.integration {
      border-bottom: none;
    }
  }

  .guides-cell-icon {
    margin-right: 24px;
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  .guides-cell-title {
    display: flex;
    align-items: center;
    color: ${globalColors.gray};
    font-weight: 600;
    font-size: 18px;
    line-height: 1.33em;
    letter-spacing: -0.02em;
    width: 100%;
    transition: color 0.3s;

    &[href] {
      &:hover {
        color: ${globalColors.orangeMain};
      }
    }

    &:not(:last-child) {
      margin-bottom: 32px;
    }

    &.integration {
      justify-content: space-between;

      .guides-cell-icon {
        margin-left: 8px;
        margin-right: 0;
        width: initial;
        height: 24px;
      }
    }
  }

  .guides-cell-description {
    font-size: 13px;
    line-height: 1.6em;

    a {
      color: ${globalColors.orangeMain};

      &:hover {
        text-decoration: none;
      }
    }
  }

  .guides-cell-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 32px;
    padding: 24px 32px 32px;
  }

  .guides-cell-column {
    display: grid;
    gap: ${(props) => (props.$isCategoryPage ? "24px" : "32px")};
    .column {
      display: grid;
      gap: 16px;
    }
  }

  .guides-cell-featured-links {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 20px;
    padding: 24px 32px 0;

    .guides-cell-featured-link {
      display: flex;
      align-items: center;
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

    @media ${device.mobile} {
      gap: 16px;
    }
  }

  .guides-cell-link {
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.04em;
    color: ${globalColors.gray};
    transition: color 0.3s;

    &.external-link {
      text-decoration: none;
    }

    &.more {
      color: ${globalColors.orangeMain};
      cursor: pointer;
      text-decoration: underline;
    }

    @media ${device.mobile} {
      font-size: 13px;
    }

    &.guides-cell-header-link {
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      text-transform: uppercase;
    }

    &[href] {
      &:hover {
        color: ${globalColors.orangeMain};
      }
    }
  }

  @media ${device.laptopM} {
    width: 100%;
  }

  @media ${device.tablet} {
    .guides-cell-columns {
      grid-template-columns: 1fr;
      gap: ${(props) => (props.$isCategoryPage && "24px")};
    }

    .guides-cell-icon {
      margin-right: 32px;
    }
  }

  @media ${device.mobile} {
    margin-bottom: ${(props) => (props.$isCategoryPage ? "24px" : "32px")};

    .guides-cell-icon {
      margin-right: 24px;
    }

    .guides-cell-title {
      font-size: 16px;
    }
  }
`;

export default StyledGuidesCell;
