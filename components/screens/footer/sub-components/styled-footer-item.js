import styled, { css } from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledFooterItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  .footer-items-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media ${device.mobile} {
      display: grid;
      position: initial;
      margin-bottom: 0;
      overflow: hidden;
      gap: 16px;
      transition: max-height 0.3s ease;

      ${(props) =>
        props.$isOpen
          ? css`
              margin-bottom: 16px;
              max-height: ${(props) => props.$maxHeight};
            `
          : css`
              margin-bottom: 0;
              max-height: 0;
            `}
    }
  }

  .footer-link {
    font-size: 13px;
    line-height: 18px;
    color: ${globalColors.white};
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: ${globalColors.orangeMain};
    }
  }

  .footer-item-heading {
    margin-bottom: 16px;
    font-size: 13px;
    line-height: 18px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: ${globalColors.textGray};
    text-transform: uppercase;

    &:after {
      @media ${device.mobile} {
        content: "";
        display: inline-flex;
        width: 11px;
        height: 11px;
        background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/chevron-right-white.react.svg");
        background-repeat: no-repeat;
      }
    }

    &.up {
      &:after {
        @media ${device.mobile} {
          transform: rotate(90deg);
        }
      }
    }

    @media ${device.mobile} {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0;
      padding: 15px 0 14px;
      color: ${globalColors.white};
      overflow: hidden;
      cursor: pointer;
    }
  }

  @media ${device.mobile} {
    display: block;
    border-bottom: 1px solid #616161;
  }
`;

export default StyledFooterItem;
