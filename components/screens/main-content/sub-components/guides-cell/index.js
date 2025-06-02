import StyledGuidesCell from "./styled-guides-cell";
import React, { useState, useEffect } from "react";
import topSlugIdData from "../../data/top-slugid.json";
import InternalLink from "@components/common/internal-link";
import ExternalLink from "@components/common/external-link";
import ReactHtmlParser from "react-html-parser";
import Heading from "@components/common/heading";
import { isExternalLink } from "@utils/helpers/System/isExternal";

const GuidesCell = ({ data }) => {
  const [isClient, setIsClient] = useState(false);
  const slugId = data.slug_id === "docs" ? "docs" : `${data.slug_id}s`;
  const connectorsSlug = data.slug_id === "integration";
  const connectorsArticles = data.articles?.sort((a, b) => a.title.localeCompare(b.title));
  const items = data[`category_${slugId}`]?.sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || a.name.localeCompare(b.name))
    .filter(item => !topSlugIdData.includes(item.slug_id)) || [];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <StyledGuidesCell>
      <div className="guides-cell-header">
        {data.url === null ? (
          <>
            <Heading className="guides-cell-title" level={4} >
              <img className="guides-cell-icon" src={data.card_field_img?.url} alt={data.name} />
              {data.name}
            </Heading>
          </>
        ) : (
          <InternalLink className="guides-cell-title" href={data.url}>
            <img className="guides-cell-icon" src={data.card_field_img?.url} alt={data.name} />
            {data.name}
          </InternalLink>
        )}
        {data.description &&
          <div className="guides-cell-description">{ReactHtmlParser(data.description)}</div>
        }
      </div>
      <div className="guides-cell-columns">
        <div className="guides-cell-column">
          {connectorsSlug ? (
            <div className="column">
              {connectorsArticles?.slice(0, Math.ceil(connectorsArticles.length / 2)).map((item, index) => (
                <InternalLink className="guides-cell-link" label={item.title} href={item.url} key={index} />
              ))}
            </div>
          ) : (
            items?.slice(0, Math.ceil(items?.length / 2)).map((item, index) => (
              <div className="column" key={index}>
                {item.url ? (
                  <>
                    {isClient && isExternalLink(item.url) ? (
                      <ExternalLink className="guides-cell-link guides-cell-header-link" label={item.name} href={item.url} />
                    ) : (
                      <InternalLink className="guides-cell-link guides-cell-header-link" label={item.name} href={item.url} />
                    )}
                  </>
                ) : (
                  <div className="guides-cell-link guides-cell-header-link">{item.name}</div>
                )}
                {item[`level_2_${slugId}`]?.sort((a, b) => (a.position === null) - (b.position === null) || a.position - b.position)
                  .map((itemLevel2, index) => {
                    return isClient && isExternalLink(itemLevel2?.url) ? (
                      <ExternalLink
                        className="guides-cell-link"
                        label={itemLevel2.name}
                        href={itemLevel2?.url}
                        key={index}
                      />
                    ) : (
                      <InternalLink
                        className="guides-cell-link"
                        label={itemLevel2.name}
                        href={itemLevel2?.url}
                        key={index}
                      />
                    );
                  })
                }
                {item[`article_${slugId}`]?.sort((a, b) => a.title.localeCompare(b.title)).map((itemLevel2, index) => {
                  return isClient && isExternalLink(itemLevel2?.url) ? (
                    <ExternalLink
                      label={itemLevel2.name || itemLevel2.title}
                      key={index}
                      href={itemLevel2?.url}
                    />
                  ) : (
                    <InternalLink
                      className="guides-cell-link"
                      label={itemLevel2.name || itemLevel2.title}
                      href={itemLevel2?.url}
                      key={index}
                    />
                  );
                })
                }
              </div>
            )))}
        </div>
        <div className="guides-cell-column">
          {connectorsSlug ? (
            <div className="column">
              {connectorsArticles?.slice(Math.ceil(connectorsArticles.length / 2), connectorsArticles.length).map((item, index) => (
                <InternalLink className="guides-cell-link" label={item.title} href={item.url} key={index} />
              ))}
            </div>
          ) : (
            items?.slice(Math.ceil(items.length / 2), items?.length).map((item, index) => (
              <div className="column" key={index}>
                {item.url ? (
                  <>
                    {isClient && isExternalLink(item.url) ? (
                      <ExternalLink className="guides-cell-link guides-cell-header-link" label={item.name} href={item.url} />
                    ) : (
                      <InternalLink className="guides-cell-link guides-cell-header-link" label={item.name} href={item.url} />
                    )}
                  </>
                ) : (
                  <div className="guides-cell-link guides-cell-header-link">{item.name}</div>
                )}
                {item[`level_2_${slugId}`]?.sort((a, b) => (a.position === null) - (b.position === null) || a.position - b.position)
                  .map((itemLevel2, index) => {
                    return isClient && isExternalLink(itemLevel2?.url) ? (
                      <ExternalLink
                        className="guides-cell-link"
                        label={itemLevel2.name}
                        href={itemLevel2?.url}
                        key={index}
                      />
                    ) : (
                      <InternalLink
                        className="guides-cell-link"
                        label={itemLevel2.name}
                        href={itemLevel2?.url}
                        key={index}
                      />
                    );
                  })
                }
                {item[`article_${slugId}`]?.sort((a, b) => a.title.localeCompare(b.title)).map((itemLevel2, index) => {
                  return isClient && isExternalLink(itemLevel2?.url) ? (
                    <ExternalLink
                      className="guides-cell-link"
                      label={itemLevel2.name || itemLevel2.title}
                      href={itemLevel2?.url}
                      key={index}
                    />
                  ) : (
                    <InternalLink
                      className="guides-cell-link"
                      label={itemLevel2.name || itemLevel2.title}
                      href={itemLevel2?.url}
                      key={index}
                    />
                  );
                })
                }
              </div>
            ))
          )}
        </div>
      </div>
    </StyledGuidesCell>
  );
};

export default GuidesCell;
