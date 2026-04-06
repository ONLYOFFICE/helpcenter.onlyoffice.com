import styled from "styled-components";
import Section from "@components/common/section";
import globalColors from "@components/utils/global-colors";

const StyledFaqContent = styled(Section)`
  .switcher {
    color: ${globalColors.orangeMain};
    cursor: pointer;
    margin: 24px 0;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }

  .faq-items {
      padding: 0 0 32px;
  }
  .faq-title {
      padding: 0 0 16px;
  }
`;

export default StyledFaqContent;
