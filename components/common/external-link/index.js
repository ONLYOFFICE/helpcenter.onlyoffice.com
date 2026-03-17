import PropTypes from "prop-types";
import StyledExternalLink from "./styled-external-link";

const ExternalLink = ({ className, children, label, href, ...rest }) => {
  const ClassNameExternalLink = className
    ? `${className} external-link`
    : "external-link";

  return (
    <StyledExternalLink as="a" href={href} className={ClassNameExternalLink} {...rest}>
      {children || label}
    </StyledExternalLink>
  );
};

ExternalLink.propTypes = {
  /** Link text */
  label: PropTypes.string,
  /** Link text color */
  color: PropTypes.string,
  /** Link text font-size */
  fontSize: PropTypes.string,
  /** Link text font-weight */
  fontWeight: PropTypes.string,
  /** Link text text-transform */
  textTransform: PropTypes.string,
  /** Sets font weight value ​​to bold */
  $isBold: PropTypes.bool,
  /** Sets the 'display: inline-block' property */
  $isInline: PropTypes.bool,
  /** Sets the font style */
  $isItalic: PropTypes.bool,
  /** Sets the hover text decoration */
  $isHoverText: PropTypes.bool,
  /** Sets the 'display' property */
  display: PropTypes.string,
  /** Used as HTML 'href' property */
  href: PropTypes.string,
  /** Used as HTML 'title' property */
  title: PropTypes.string,
  /** Link text-decoration */
  textDecoration: PropTypes.string,
  /** Link hover text-decoration  */
  hoverTextDecoration: PropTypes.string,
  /** What the link will trigger when clicked */
  onClick: PropTypes.func,
  /** Link tab index */
  tabIndex: PropTypes.number,
  /** The target attribute specifies where the linked document will open when the link is clicked */
  target: PropTypes.oneOf(["_blank", "_self", "_parent", "_top"]),
  /** Attribute defines the relationship between a linked resource and the current document */
  rel: PropTypes.string,
  /** Accepts id */
  id: PropTypes.string,
  /** Accepts class */
  className: PropTypes.string,
};

ExternalLink.defaultProps = {
  label: undefined,
  href: undefined,
  title: undefined,
  rel: "noopener noreferrer",
  $isInline: true,
  $isHoverText: true,
  $isItalic: false,
  $isBold: false,
  target: "_blank",
};

export default ExternalLink;
