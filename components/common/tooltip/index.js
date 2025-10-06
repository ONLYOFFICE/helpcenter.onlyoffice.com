import { useEffect } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import StyledTooltip from "./styled-tooltip";

const Tooltip = () => {
  useEffect(() => {
    document.querySelectorAll('.tdwttp').forEach(row => {
      row.querySelectorAll('td').forEach(cell => {
        if (!cell.querySelector('.tooltip-target')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'tooltip-target';
          wrapper.setAttribute('data-tooltip-html', row.getAttribute('title'));
          wrapper.setAttribute('data-tooltip-id', 'tables-tooltip');
          wrapper.style.width = '100%';
          wrapper.style.height = '100%';
          wrapper.style.display = 'block';
    
          while (cell.firstChild) {
            wrapper.appendChild(cell.firstChild);
          }
          cell.appendChild(wrapper);
        }
      });
      row.removeAttribute('title');
    });
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
