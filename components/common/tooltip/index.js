import { useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import StyledTooltip from "./styled-tooltip";

const Tooltip = () => {
  useEffect(() => {
    const applyTooltips = () => {
    const elements = document.querySelectorAll(".tdwttp");

    elements.forEach((el) => {
      const title = el.getAttribute("title");

      if (title) {
        el.querySelectorAll("td").forEach((cell) => {
          cell.setAttribute("data-tooltip-html", title);
          cell.setAttribute("data-tooltip-id", "tables-tooltip");
        });

        el.removeAttribute("title");
      }
    });

      setTimeout(() => {
        try {
          ReactTooltip.rebuild?.();
        } catch (e) {
          console.warn("Tooltip rebuild skipped:", e);
        }
      }, 50);
    };

    applyTooltips();

    const observer = new MutationObserver(() => {
      applyTooltips();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <StyledTooltip>
      <ReactTooltip
        id="tables-tooltip"
        className="tooltip"
        place="bottom"
        noArrow
        offset={15}
      />
    </StyledTooltip>
  );
};

export default Tooltip;
