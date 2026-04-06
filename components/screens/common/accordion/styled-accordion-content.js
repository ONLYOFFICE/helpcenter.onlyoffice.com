import styled from "styled-components";
import Section from "@components/common/section";
import { device } from "@components/utils/devices";

const StyledAccordionContent = styled(Section)`
  padding: 0 0 112px;

  .accordion-item {
    padding: 16px 0;

    @media ${device.mobile} {
      padding: 16px 0;
    }
  }

  .accordion-text {
    padding-left: 40px;

    a {
      display: initial;
      text-decoration: underline;
    }
  }

  .title-accordion {
    padding: 0 0 56px;
    letter-spacing: -0.02em;

    @media ${device.tablet} {
      padding: 0 0 48px;
    }

    @media ${device.mobile} {
      font-size: 20px;
      padding: 0 0 32px;
    }
  }

  @media ${device.laptop} {
    padding: 0 0 88px;
  }

  @media ${device.mobile} {
    padding: 0 0 48px;
  }
`;

export default StyledAccordionContent;
