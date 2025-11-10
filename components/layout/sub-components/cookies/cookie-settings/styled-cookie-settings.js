import styled from "styled-components";
import { device } from "@components/utils/devices";

const StyledCookieSettingsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledCross = styled.div`
  cursor: pointer;
  content: "";
  width: 24px;
  height: 24px;
  background-image: url("https://static-helpcenter.onlyoffice.com/images/icons/close-icon.react.svg");
  background-position: center;
  background-repeat: no-repeat;
`;

const StyledCookieSettings = styled.div`
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 5px;
  box-shadow: 0px 7px 15px 0px #5555551a;
  display: inline-block;
  padding: 32px;
  max-width: 534px;
  left: 0;
  margin: 0 auto;
  right: 0;
  top: calc(50% - 260px);
  position: fixed;
  width: 100%;
  text-align: center;
  z-index: 10002;

  @media ${device.tablet} {
    max-width: calc(100% - 144px);
  }

  @media ${device.mobile} {
    max-width: calc(100% - 40px);
    padding: 16px;
  }

  > button {
    text-transform: none;
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    border-radius: 6px;

    @media ${device.mobile} {
      height: 48px;
      width: 100%;
    }
  }
`;

const StyledCheckboxes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 0;

  @media ${device.mobile} {
    gap: 16px;
    padding: 16px 0;
  }
`;

const StyledCheckText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;
  text-align: left;
  > h4 {
    font-size: 16px;
  }
`;

export {
  StyledCookieSettingsHeader,
  StyledCookieSettings,
  StyledCross,
  StyledCheckboxes,
  StyledCheckText,
};