import StyledCategory from "./styled-category";
import InternalLink from "@components/common/internal-link";
const ORDER = ["docs", "docspace", "ai", "desktop", "mobile", "integration", "workspace"];

const Category = ({ data }) => {
 const sorted = [...data.data].sort((a, b) => 
    (ORDER.indexOf(a.slug_id) + 1 || Infinity) - (ORDER.indexOf(b.slug_id) + 1 || Infinity)
  );
  return (
    <StyledCategory>
      {sorted.map((item, index) => (
        <InternalLink className="category-box" href={item.url} key={index}>
          <img className="category-box-img" src={item.card_field_img?.url} alt={item.name} />
          <div className="category-box-title">{item.name}</div>
        </InternalLink>
      ))}
    </StyledCategory>
  );
};

export default Category;