import styled from "styled-components";
import globalColors from "../../../../../../components/utils/global-colors";

const StyledDictionary = styled.div`
  display: block;

  .int_link {
    color: ${globalColors.orangeLetters};
    cursor: pointer;
    text-decoration: none;
  }

  .see_also {
    border-bottom: 1px dotted ${globalColors.orangeLetters};
    color: ${globalColors.orangeLetters};
    display: inline;
    font-size: 14px;
    margin: 0;
    padding: 0 2px;
    text-decoration: none;
  }

  .strong_text {
    color: #808080;
    font-weight: 700;
  }
`;

export default StyledDictionary;
