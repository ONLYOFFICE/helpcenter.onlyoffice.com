import StyledCategory from "./styled-category";
import InternalLink from "@components/common/internal-link";

const Category = ({ data }) => {
  return (
    <StyledCategory>
      {data.data.sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity)).map((item, index) => (
        <InternalLink className="category-box" href={item.url} key={index}>
          <img className="category-box-img" src={item.card_field_img?.url} alt={item.name} />
          <div className="category-box-title">{item.name}</div>
        </InternalLink>
      ))}
    </StyledCategory>
  );
};

export default Category;