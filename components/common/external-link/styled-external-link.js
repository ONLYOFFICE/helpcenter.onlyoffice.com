import styled, { css } from "styled-components";
import { Base } from "@components/themes";
import StyledText from "@components/common/text/styled-text";

const hoverText = css`
  ${(props) =>
    props.$isHoverText &&
    css`
      :hover {
        color: ${(props) =>
          props.hoverColor || props.theme.externalLink.hoverColor};
        text-transform: ${(props) =>
          props.hoverTextTransform ||
          props.theme.externalLink.hoverTextTransform};
        text-decoration: ${(props) =>
          props.hoverTextDecoration ||
          props.theme.externalLink.hoverTextDecoration};
        cursor: ${(props) => props.theme.externalLink.hoverCursor};
      }
    `};
`;

const StyledExternalLink = styled(StyledText)`
  color: ${(props) => props.color || props.theme.externalLink.color};
  display: block;
  text-decoration: ${(props) =>
    props.textDecoration || props.theme.externalLink.textDecoration};
  ${hoverText}
`;

StyledExternalLink.defaultProps = { theme: Base };

export default StyledExternalLink;
