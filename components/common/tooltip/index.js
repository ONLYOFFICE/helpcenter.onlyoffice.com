import { useEffect } from "react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import StyledTooltip from "./styled-tooltip";

const Tooltip = () => {
  useEffect(() => {
    const rows = document.querySelectorAll(".tdwttp");

    rows.forEach((row) => {
      const title = row.getAttribute("title");
      if (!title) return;

      row.querySelectorAll("td").forEach((cell) => {
        if (!cell._tippy) {
          tippy(cell, {
            content: title,
            placement: "bottom",
            arrow: false,
            offset: [0, 15],
            allowHTML: true,
          });
        }
      });

      row.removeAttribute("title");
    });
  }, []);

  return <StyledTooltip />;
};

export default Tooltip;
