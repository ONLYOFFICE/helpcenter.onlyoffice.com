import styled from "styled-components";
import { Base } from "@components/themes";
import globalColors from "@components/utils/global-colors";

const StyledButton = styled.button`
  overflow: ${(props) => props.theme.button.overflow};
  text-overflow: ${(props) => props.theme.button.textOverflow};
  white-space: ${(props) => props.theme.button.whiteSpace};
  box-sizing: ${(props) => props.theme.button.boxSizing};
  margin: ${(props) => props.theme.button.margin};
  display: ${(props) => props.theme.button.display};
  text-align: ${(props) => props.theme.button.textAlign};
  text-decoration: ${(props) => props.theme.button.textDecoration};

  -webkit-tap-highlight-color: transparent;

  letter-spacing: normal;

  height: ${(props) => props.height};
  width: ${(props) => (props.$isScale ? "100%" : props.width)};

  min-width: ${(props) => props.$minwidth || "min-content"};

  border: ${(props) =>
    props.$typeButton === "transparent"
      ? props.theme.button.borderTransparentType
      : "unset"};
  border-radius: ${(props) => props.theme.button.borderRadius};

  font-size: ${(props) => props.fontSize || props.theme.button.fontSize};
  font-weight: ${(props) => props.fontWeight || props.theme.button.fontWeight};
  text-transform: ${(props) => props.theme.button.textTransform};
  line-height: ${(props) => props.lineHeight || props.theme.button.lineHeight};

  color: ${(props) =>
    props.$typeButton === "transparent"
      ? props.theme.button.textColorTransparentType
      : props.$typeButton === "secondary"
        ? props.theme.button.textColorSecondaryType
        : props.$typeButton === "white"
          ? `${globalColors.grayMain}`
          : props.theme.button.textColor};

  padding: ${(props) => (props.padding ? props.padding : "0 20px")};
  transition-duration: ${(props) =>
    props.transitionDuration || props.theme.button.transitionDuration};

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  background-color: ${(props) =>
    props.$typeButton === "primary"
      ? props.theme.button.backgroundColorPrimary
      : props.$typeButton === "transparent"
        ? "transparent"
        : props.$typeButton === "white"
          ? `${globalColors.white}`
          : props.theme.button.backgroundColorSecondary};
  opacity: ${(props) => (props.$typeButton === "white" ? 0.9 : 1)};

  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.$backgroundColorHover ||
      (props.$typeButton === "primary"
        ? props.theme.button.backgroundColorPrimaryHover
        : props.$typeButton === "transparent"
          ? "transparent"
          : props.$typeButton === "white"
            ? `${globalColors.white}`
            : props.theme.button.backgroundColorSecondaryHover)};
    border-color: ${(props) =>
      props.$borderColorHover
        ? props.$borderColorHover
        : props.$typeButton === "transparent" &&
          props.theme.button.borderColorHover};
    color: ${(props) =>
      props.$textColorHover ||
      (props.$typeButton === "transparent"
        ? props.theme.button.textColorTransparentTypeHover
        : props.$typeButton === "secondary"
          ? props.theme.button.textColorSecondaryType
          : props.$typeButton === "white"
            ? `${globalColors.grayMain}`
            : props.theme.button.textColor)};
    opacity: ${(props) => (props.$typeButton === "white" ? 1 : 1)};
  }

  &:disabled {
    cursor: default;
    opacity: ${(props) => (props.$typeButton !== "primary" ? 0.3 : 1)};
    background-color: ${(props) =>
      props.$typeButton === "primary"
        ? "#ffd4c5"
        : props.$typeButton === "transparent"
          ? "transparent"
          : props.theme.button.backgroundColorSecondary};
    border-color: ${(props) =>
      props.$typeButton === "transparent" && props.theme.button.borderColor};
    color: ${(props) =>
      props.$typeButton === "transparent"
        ? props.theme.button.textColorTransparentType
        : props.$typeButton === "secondary"
          ? props.theme.button.textColorSecondaryType
          : props.theme.button.textColor};
  }

  .btn-with-icon {
    display: inline-block;
    vertical-align: middle;
  }
`;

StyledButton.defaultProps = { theme: Base };

export default StyledButton;
