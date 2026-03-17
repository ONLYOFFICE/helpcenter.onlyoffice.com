import styled, { css } from "styled-components";
import { device } from "@components/utils/devices";
import globalColors from "@components/utils/global-colors";

const StyledImagePopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s,
    visibility 0.3s;
  z-index: 1001;

  ${(props) =>
    props.$active &&
    css`
      opacity: 1;
      visibility: visible;
    `}

  .popup-content {
    position: relative;

    > img {
      max-width: 90vw;
      max-height: 90vh;
      background-color: ${globalColors.white};
      box-shadow: 0 7px 25px rgb(0, 0, 0, 0.1);
      object-fit: contain;
    }
  }

  @media ${device.laptop} {
    display: none;
  }
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  display: block;
  width: 16px;
  height: 16px;
  margin: 0px 0 0;
  background-color: ${globalColors.white};
  border-radius: 50%;
  color: transparent;
  right: -20px;
  top: -20px;

  &:before,
  &:after {
    content: "";
    background-color: ${globalColors.gray};
    position: absolute;
    transform: rotate(45deg);
    border-radius: 1px;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 1px;
    border-radius: 50%;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export { CloseButton, StyledImagePopup };
