import { useState, useRef, useEffect } from "react";
import StyledFooterItem from "./styled-footer-item";
import Heading from "@components/common/heading";

const FooterItem = ({ dis, children, heading }) => {
  const contentRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  const onHandleClick = (e) => {
    e.preventDefault();
    window.innerWidth <= 592 && setIsOpen(!isOpen);
  };

  return (
    <StyledFooterItem
      $isOpen={isOpen}
      $maxHeight={maxHeight}
      className="footer-item"
    >
      {heading && (
        <Heading
          className={`footer-item-heading ${isOpen ? "up" : ""}`}
          level={6}
          onClick={dis && onHandleClick}
          label={heading}
        />
      )}
      <div ref={contentRef} className="footer-items-group">
        {children}
      </div>
    </StyledFooterItem>
  );
};

export default FooterItem;
