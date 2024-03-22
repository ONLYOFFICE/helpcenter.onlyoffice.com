import styled from "styled-components";
import { device } from "@components/utils/devices";

const StyledSingleLayout = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  width: 100%;
  max-width: 1120px;
  margin: 72px auto 0;
  padding: 0 32px;

  .section-page {
    .cell_container {
      display: flex;
      flex-direction: column;
      gap: 32px 0px;
    }

    @media ${device.tablet} {
      flex-direction: column;
      .cell_container {
      }
    }
  }

  h3.subcat-heading {
    padding: 0 0 24px;
    &.dlw {
      display: flex;
      gap: 16px;
    }
  }

  .subcat-div {
    padding: 0 0 24px;
    h5 {
      padding: 0;
    }
  }

  .classic-ul {
    list-style-type: none;
    > li {
        padding: 16px 0 0;
      > a > span {
        color: #333333;
        text-decoration: none;
        &:hover {
          color: #ff6f3d;
        }
      }
    }
  }

  .reqs {
      display: flex;
      gap: 8px;
      text-decoration: underline;
  }

  .top-links {
    gap: 32px;
    padding: 0 0 32px;
  }

  // changelog-page
  .changelog-page {
    &.docs-log {
      .changelog-switcher  .changelog-subheader {
        font-size: 14px;
        font-weight: 400;
        padding: 16px 0 0;
      }
    }
    .changelog-main-header {
      position: relative;
      cursor: pointer;
      font-size: 18px;
      font-weight: 700;
      line-height: 23.94px;
      letter-spacing: -0.02em;
      margin: 0;
      text-align: left;
      &::before {
        content: "+";
        height: 24px;
        padding: 0 10px 0 0;
        width: 24px;
      }
    }
    .changelog-release-date {
      float: right;
      margin: -24px 0px 0;
      .crd-date {
        color: #ff6f3d;
      }
    }
    .changelog-switcher {
      display: none;
      transition: 0.3s ease;
      .changelog-subheader {
        font-size: 18px;
        font-weight: 600;
        padding: 24px 0 16px;
        margin: 0;
      }
      .bigVideoCont {
        border: none;
        display: block;
        padding: 24px 0 0;
        > iframe {
          aspect-ratio: 1.8;
          width: 80%;
        }
      }

      > ul {
        padding: 0 0 24px 16px;
        &:last-child {
          padding: 0 0 0px 16px;
        }
      }

      .changelog-subsubheader {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        padding: 0 0 8px;
      }
    }
    .changelog-version-block {
      border-bottom: 1px solid #f5f5f5;
      padding: 32px 0;
    }
  }

  .question_answer p span {
    color: #ff642e;
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    margin: 0 8px 0 0;
    &.answer {
      color: #5b9c18;
  }
  }
    
  @media ${device.laptopM} {
    max-width: 100vw;
    margin: 72px auto 0;
  }
  @media (max-width: 500px) {
    margin: 106px auto 0;
  }
  
  @media ${device.tabletS} {
    //margin: 56px auto 0;
  }
`;

export default StyledSingleLayout;
