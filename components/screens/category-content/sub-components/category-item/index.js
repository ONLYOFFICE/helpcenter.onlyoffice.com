import StyledCategoryItem from "./styled-category-item";
import Heading from "@components/common/heading";
import InternalLink from "@components/common/internal-link";
import { useRouter } from "next/router";

const CategoryItem = ({ data, leftMenuLevel, categorySlug }) => {
  const categorySlugPlural = categorySlug === "docs" ? "docs" : `${categorySlug}s`;
  const icon = data.icon || data.category_pic;
  const levelLinks = data[`level_${leftMenuLevel}_${categorySlugPlural}`] || [];
  const articleLinks = data[`article_${categorySlugPlural}`] || [];
  const router = useRouter();

  const sortByIconOrPositionOrName = (a, b) => (b.icon_small?.url ? 1 : 0) - (a.icon_small?.url ? 1 : 0) || (a.position ?? Infinity) - (b.position ?? Infinity) || (a.name).localeCompare(b.name);
  const sortByPositionOrTitle = (a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || (a.title).localeCompare(b.title);

  const topPositionSubLinks = levelLinks.filter(item => item.position_top);
  const filteredSubLinks = [...levelLinks.filter(item => !item.position_top).sort(sortByIconOrPositionOrName), ...articleLinks.sort(sortByPositionOrTitle)];

  const checkTitleLength = !filteredSubLinks.some(item => {
    const title = item.title;
    return title && title.replace(/\s/g, "").length > 40;
  });

  const renderIcon = () => {
    if (icon?.url) {
      return (
        <img
          style={{
            height: icon.height,
            width: icon.width
          }}
          src={icon.url}
          alt={data.name}
        />
      );
    }
  };

  return (
    <StyledCategoryItem className="category-item" id={data.url.split("#")[1]?.length !== 0 ? data.url.split("#")[1] : ''}>
      <Heading className="category-item-title" level={4}>
        {data.url && data.url.split("#")[0] !== router.asPath ? (
          <InternalLink href={data.url}>
            {renderIcon()}
            {data.name}
          </InternalLink>
        ) : (
          <>
            {renderIcon()}
            {data.name}
          </>
        )}
      </Heading>
      {topPositionSubLinks.length > 0 && (
        <ul className="category-item-top-links">
          {topPositionSubLinks.map((item, index) => (
            <li key={index}>
              <InternalLink href={item.url}>
                {item.icon_small?.url && (
                  <img src={item.icon_small.url} alt={item.name || item.level_4_title || item.title} />
                )}
                {item.name || item.level_4_title || item.title}
              </InternalLink>
            </li>
          ))}
        </ul>
      )}
      {data.subtitle && (
        <Heading className="category-item-subtitle" level={5} label={data.subtitle} />
      )}
      {filteredSubLinks.length > 0 && (
        <>
          {checkTitleLength && filteredSubLinks.length > 6 ? (
            <div className="category-item-wrapper">
              <ul className="category-item-list">
                {filteredSubLinks?.slice(0, Math.ceil(filteredSubLinks?.length / 2)).map((item, index) => (
                  <li key={index}>
                    <InternalLink href={item.url}>
                      {item.icon_small?.url && (
                        <img src={item.icon_small.url} alt={item.name || item.level_4_title || item.title} />
                      )}
                      {item.name || item.level_4_title || item.title}
                    </InternalLink>
                  </li>
                ))}
              </ul>
              <ul className="category-item-list">
                {filteredSubLinks?.slice(Math.ceil(filteredSubLinks.length / 2)).map((item, index) => (
                  <li key={index}>
                    <InternalLink href={item.url}>
                      {item.icon_small?.url && (
                        <img src={item.icon_small.url} alt={item.name || item.level_4_title || item.title} />
                      )}
                      {item.name || item.level_4_title || item.title}
                    </InternalLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="category-item-list">
              {filteredSubLinks.map((item, index) => (
                <li key={index}>
                  <InternalLink href={item.url}>
                    {item.icon_small?.url && (
                      <img src={item.icon_small.url} alt={item.name || item.level_4_title || item.title} />
                    )}
                    {item.name || item.level_4_title || item.title}
                  </InternalLink>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </StyledCategoryItem>
  );
};

export default CategoryItem;