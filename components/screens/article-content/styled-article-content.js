import styled from "styled-components";
import Section from "@components/common/section";

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
  }
`;

export default StyledArticleContent;
