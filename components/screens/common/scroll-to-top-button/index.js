import PropTypes from "prop-types";
import StyledScrollToTopButton from "./styled-scroll-to-top-button";

const ScrollToTopButton = ({ showButton }) => {
  function topFunction() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <StyledScrollToTopButton
      onClick={() => topFunction()}
      className="scroll-to-top-button"
      $showButton={showButton}
    >
      <button></button>
    </StyledScrollToTopButton>
  );
};

ScrollToTopButton.propTypes = {
  /** Accepts CSS style */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  /** Tab index */
  tabIndex: PropTypes.number,
  /** Accepts class */
  className: PropTypes.string,
};

export default ScrollToTopButton;
