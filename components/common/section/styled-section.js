import styled from "styled-components";
import { device } from "@components/utils/devices";

const StyledSection = styled.section`
  .section-page {
    max-width: 1120px;
    padding: 0 0 0 40px;
    margin: 0 auto;
  }

  @media ${device.tabletS} {
    .section-page {
      padding: 0 0 0 16px;
    }
  }
`;

export default StyledSection;
