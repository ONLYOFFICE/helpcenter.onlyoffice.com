import styled, { css } from "styled-components";
import StyledIconButton from "../icon-button/styled-icon-button";
import globalColors from "../utils/global-colors";
import arrow_gray from "../../static/images/icons/arrowup.png"

const StyledUpArrow = styled(StyledIconButton)`
background-color: #9ea4b5;
background-image: url(${arrow_gray});
background-position: center center;
background-repeat: no-repeat;
border-radius: 3px;
bottom: 80px;
left: 24px;
position: fixed;
opacity: 0.8;
z-index: 15000;
height: 40px;
transition: 1s;
width: 40px;

&:hover {
    background-color: rgba(61,74,107,0.7);
}
`

export default StyledUpArrow;