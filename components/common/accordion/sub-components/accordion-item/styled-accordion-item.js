import styled from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledAccordionItem = styled.div`
  position: relative;
  border-top: 1px solid #E5E5E5;
  padding: 32px 0;

  @media ${device.mobile} {
    padding: 24px 0;
  }

  &:last-child {
    border-bottom: 1px solid #E5E5E5;
  }

  .accordion-btn {
    display: flex;
    justify-content: flex-start;
    border: none;
    cursor: pointer;
    align-items: center;
    gap: 10px;
    width: 100%;
    background-color: transparent;
  }

  .accordion-icon {
    font-size: 24px;
    line-height: 24px;
    font-weight: 600;
    text-align: center;
    transition: transform 0.2s ease;
    width: 24px;
    min-width: 24px;
  }

  .accordion-content {
    background-color: white;
    overflow: hidden;
    transition: max-height 0.2s ease;
  }

  .accordion-text {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    padding-top: 16px;
    padding-left: 34px;

          
    table {
      border-spacing: 0;
      margin: 10px 0 20px;
      text-align: center;
      width: 100%;

      th {
        border-bottom: 1px solid #d7d8dc;
        color: #333333;
        font-size: 16px;
        font-weight: 600;
        padding: 8px;
        vertical-align: middle;
        word-break: keep-all;
        white-space: normal;
      }
      td {
          border-bottom: 1px solid #d7d8dc;
          padding: 8px;
          color: ${globalColors.gray};
          font-size: 16px;
          font-weight: 600;
          vertical-align: middle;
          width: 12%;

          span {
            font-size: 16px;
            font-weight: 600;

            &.yes, &.no {
              background-image: url(https://static-helpcenter.onlyoffice.com/images/icons/faq_check_icons.react.svg);
              background-repeat: no-repeat;
              background-position: 100% 0;
              content: "";
              display: inline-block;
              height: 24px;
              margin-top: -4px;
              position: relative;
              width: 24px;
              vertical-align: middle;
            }

            &.no {
              background-position: -48px 0;
            }
          }
      }
    }

    > ul {
      padding-left: 16px;
    }

    a {
      color: ${globalColors.orangeMain};

      &:hover {
        text-decoration: none;
      }
    }

    @media ${device.mobile} {
      font-size: 13px;
    }
  }

  .accordion-heading {
    outline: none;
    letter-spacing: -0.02em;
    cursor: pointer;

    @media ${device.mobile} {
      font-size: 16px;
    }
  }
`;

export default StyledAccordionItem;
