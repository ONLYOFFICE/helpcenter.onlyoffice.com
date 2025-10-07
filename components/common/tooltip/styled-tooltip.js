import { createGlobalStyle } from "styled-components";
import globalColors from "@components/utils/global-colors";
import { device } from "@components/utils/devices";

const StyledTooltip = createGlobalStyle`
  .tippy-box {
    background-color: ${globalColors.white};
    box-shadow: 0 7px 25px rgba(85, 85, 85, 0.15);
    line-height: 1.3em;
    opacity: 1;
    padding: 15px;
    width: max-content;
    z-index: 999;
    border-radius: 8px;

    @media ${device.mobile} {
        max-width: calc(100% - 30px) !important;
    }
  }

  .tippy-box > .tippy-content {
    color: ${globalColors.gray};
  }

  .tippy-box b,
  .tippy-box span {
    &.ttp_norm {
      color: ${globalColors.grayMain};
    }
    &.ttp_great {
      color: ${globalColors.green};
    }
    &.ttp_bad {
      color: ${globalColors.orangeLetters};
    }
  }
`;

export default StyledTooltip;
