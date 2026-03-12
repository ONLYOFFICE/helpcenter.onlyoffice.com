import styled from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledCategory = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 32px;
  margin: 0 auto;
  max-width: 1032px;

  .category-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-width: 120px;

    &:hover {
      .category-box-title {
        color: ${globalColors.orangeMain};
      }
    }

    @media ${device.mobile} {
      min-width: 104px;
    }
  }

  .category-box-img {
    margin-bottom: 24px;
    width: 80px;
    min-width: 80px;
    height: 80px;

    @media ${device.mobile} {
      margin-bottom: 16px;
      width: 64px;
      min-width: 64px;
      height: 64px;
    }
  }

  .category-box-title {
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.04em;
    color: ${globalColors.grayMain};
    text-align: center;
    text-transform: uppercase;
    transition: color 0.3s;
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.mobileL} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default StyledCategory;
