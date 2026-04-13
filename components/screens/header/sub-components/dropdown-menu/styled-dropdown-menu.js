import styled from "styled-components";
import Masonry from "react-masonry-css";

const StyledDropdownMenu = styled(Masonry)`
  display: flex;
  position: absolute;
  top: calc(100% - 1px);
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-top: 2px solid #ff6f3d;
  padding: 32px 32px 0;
  gap: 24px;
  z-index: 300;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  min-width: 480px;
  max-width: 1360px;

  &.integration {
    padding-bottom: 32px ;
  }
`;

const Column = styled.div`
  min-width: 196px;
  flex: 1;
  > div {
  padding-bottom: 32px;
  }
`;

const ColTitle = styled.a`
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #333;
  line-height: 1.33em;
  text-decoration: none;
  text-transform: uppercase;
  padding-bottom: 12px;

  &:hover {
    color: #ff6f3d;
  }
`;

const ColLink = styled.a`
  display: block;
  font-size: 14px;
  line-height: 1em;
  color: #333;
  text-decoration: none;

  &:not(:last-child) {
  padding: 0 0 12px;
  
  }

  &:hover {
    color: #ff6f3d;
  }
`;

export { StyledDropdownMenu, ColLink, ColTitle, Column }