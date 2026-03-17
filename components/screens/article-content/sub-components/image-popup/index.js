import PropTypes from "prop-types";
import { CloseButton, StyledImagePopup } from "./styled-image-popup";

const ImagePopup = ({ t, image, active, setActive, ...rest }) => {
  return (
    <StyledImagePopup
      $active={active}
      onClick={() => setActive(false)}
      {...rest}
    >
      <div onClick={(e) => e.stopPropagation()} className="popup-content">
        <img src={image} />
        <CloseButton onClick={() => setActive(false)} />
      </div>
    </StyledImagePopup>
  );
};

ImagePopup.propTypes = {
  /** */
  active: PropTypes.bool,
  /** */
  setActive: PropTypes.func,
  /** What the will trigger when clicked */
  onClick: PropTypes.func,
};

ImagePopup.defaultProps = {};

export default ImagePopup;