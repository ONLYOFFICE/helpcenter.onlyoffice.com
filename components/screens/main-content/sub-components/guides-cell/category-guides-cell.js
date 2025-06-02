import React, { useState, useEffect } from "react";
import StyledGuidesCell from "./styled-guides-cell";
import InternalLink from "@components/common/internal-link";
import ReactHtmlParser from "react-html-parser";
import Heading from "@components/common/heading";
import ExternalLink from "@components/common/external-link";
import { isExternalLink } from "@utils/helpers/System/isExternal";

const CategoryGuidesCell = ({ data, categorySlug, t }) => {
  const [isClient, setIsClient] = useState(false);
  const connectorsSlug = data.connector_img;
  const items = [...data[`level_2_${categorySlug}`] ?? [], ...data[`article_${categorySlug}`] ?? []];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <StyledGuidesCell isCategoryPage={true}>
      <div className="guides-cell-header">
        {(data.url === null || data.url_docspace) ? (
          <>
            <Heading className={`guides-cell-title ${connectorsSlug ? "integration" : ""}`} level={4}>
              {!connectorsSlug &&
                <img className="guides-cell-icon" src={data.card_field_img?.url} alt={data.name} />
              }
              {data.name || data.title}
              {connectorsSlug &&
                <img className="guides-cell-icon" src={data.connector_img?.url} alt={data.title} />
              }
            </Heading>
          </>
        ) : (
          <InternalLink className={`guides-cell-title ${connectorsSlug ? "integration" : ""}`} href={data.url}>
            {!connectorsSlug &&
              <img className="guides-cell-icon" src={data.card_field_img?.url} alt={data.name} />
            }
            {data.name || data.title}
            {connectorsSlug &&
              <img className="guides-cell-icon" src={data.connector_img?.url} alt={data.title} />
            }
          </InternalLink>
        )}
        {data.description &&
          <div className="guides-cell-description">{ReactHtmlParser(data.description)}</div>
        }
        {data.url_docspace &&
          <div className="guides-cell-int-links">
            <InternalLink className="guides-cell-int-link docs" label={t("Docs")} href={data.url} />
            <InternalLink className="guides-cell-int-link docspace" label={t("DocSpace")} href={data.url_docspace} />
          </div>
        }
      </div>
      {!connectorsSlug &&
        <div className="guides-cell-columns">
          <div className="guides-cell-column">
            {items?.sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity)).slice(0, Math.ceil(items?.length / 2)).map((item, index) => (
              <React.Fragment key={index}>
                {isClient && isExternalLink(item?.url) ? (
                  <ExternalLink
                    className="guides-cell-link"
                    label={item.name || item.title}
                    href={item.url}
                  />
                ) : (
                  <InternalLink
                    className={`guides-cell-link ${item.name ? "guides-cell-header-link" : ""}`}
                    label={item.name || item.title}
                    href={item.url}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="guides-cell-column">
            {items?.sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity)).slice(Math.ceil(items.length / 2), items?.length).map((item, index) => (
              <React.Fragment key={index}>
                {isClient && isExternalLink(item?.url) ? (
                  <ExternalLink
                    className="guides-cell-link"
                    label={item.name || item.title}
                    href={item.url}
                  />
                ) : (
                  <InternalLink
                    className={`guides-cell-link ${item.name ? "guides-cell-header-link" : ""}`}
                    label={item.name || item.title}
                    href={item.url}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      }
    </StyledGuidesCell>
  );
};

export default CategoryGuidesCell;