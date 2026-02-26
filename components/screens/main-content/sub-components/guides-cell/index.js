import StyledGuidesCell from "./styled-guides-cell";
import React, { useState, useEffect } from "react";
import topSlugIdData from "../../data/top-slugid.json";
import InternalLink from "@components/common/internal-link";
import ExternalLink from "@components/common/external-link";
import ReactHtmlParser from "react-html-parser";
import Heading from "@components/common/heading";
import { isExternalLink } from "@utils/helpers/System/isExternal";

const VISIBLE_COUNT = 4;

const GroupColumn = ({ t, item, slugId, isClient }) => {
  const [expanded, setExpanded] = useState(false);

  const level2Items = item[`level_2_${slugId}`]?.sort(
    (a, b) => (a.position === null) - (b.position === null) || a.position - b.position
  ) || [];

  const articleItems = item[`article_${slugId}`]?.sort((a, b) =>
    a.title.localeCompare(b.title)
  ) || [];

  const allLinks = [...level2Items, ...articleItems];
  const visibleLinks = expanded ? allLinks : allLinks.slice(0, VISIBLE_COUNT);
  const hasMore = allLinks.length > VISIBLE_COUNT;

  const renderLink = (linkItem, index) => {
    const label = linkItem.name || linkItem.title;
    const href = linkItem?.url;

    if (isClient && isExternalLink(href)) {
      return <ExternalLink className="guides-cell-link" label={label} href={href} key={index} />;
    }
    return <InternalLink className="guides-cell-link" label={label} href={href} key={index} />;
  };

  return (
    <div className="column">
      {item.url ? (
        isClient && isExternalLink(item.url) ? (
          <ExternalLink className="guides-cell-link guides-cell-header-link" label={item.name} href={item.url} />
        ) : (
          <InternalLink className="guides-cell-link guides-cell-header-link" label={item.name} href={item.url} />
        )
      ) : (
        <div className="guides-cell-link guides-cell-header-link">{item.name}</div>
      )}

      {visibleLinks.map((linkItem, index) => renderLink(linkItem, index))}

      {hasMore && (
        <div
          className="guides-cell-link more"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? t("Less") : t("More")}
        </div>
      )}
    </div>
  );
};

const ConnectorsColumn = ({ t, title, articles }) => {
  const [expanded, setExpanded] = useState(false);

  const visibleItems = expanded ? articles : articles?.slice(0, VISIBLE_COUNT);
  const hasMore = articles?.length > VISIBLE_COUNT;

  return (
    <div className="column">
      <div className="guides-cell-link guides-cell-header-link">{title}</div>
      {visibleItems?.map((item, index) => (
        <InternalLink className="guides-cell-link" label={item.title} href={item.url} key={index} />
      ))}
      {hasMore && (
        <div
          className="guides-cell-link more"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? t("Less") : t("More")}
        </div>
      )}
    </div>
  );
};

const GuidesCell = ({ t, data }) => {
  const [isClient, setIsClient] = useState(false);
  const slugId = data.slug_id === "docs" ? "docs" : `${data.slug_id}s`;
  const connectorsSlug = data.slug_id === "integration";
  const connectorsArticles = data.articles?.sort((a, b) => a.title.localeCompare(b.title));

  const docsArticles = connectorsArticles?.filter(item => !item.url?.endsWith("-docspace.aspx")) || [];
  const docspaceArticles = connectorsArticles?.filter(item => item.url?.endsWith("-docspace.aspx")) || [];

  const allCategories = data[`category_${slugId}`] || [];

  const topItems = allCategories
    .filter(item => topSlugIdData.includes(item.slug_id))
    .sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || a.name.localeCompare(b.name));

  const items = allCategories
    .filter(item => !topSlugIdData.includes(item.slug_id))
    .sort((a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || a.name.localeCompare(b.name));

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <StyledGuidesCell>
      <div className="guides-cell-header">
        {data.url === null ? (
          <Heading className="guides-cell-title" level={4}>
            <img
              className="guides-cell-icon"
              src={data.card_field_img_x48 ? data.card_field_img_x48?.url : data.card_field_img?.url}
              alt={data.name}
            />
            {data.name}
          </Heading>
        ) : (
          <InternalLink className="guides-cell-title" href={data.url}>
            <img
              className="guides-cell-icon"
              src={data.card_field_img_x48 ? data.card_field_img_x48?.url : data.card_field_img?.url}
              alt={data.name}
            />
            {data.name}
          </InternalLink>
        )}
        {data.description && (
          <div className="guides-cell-description">{ReactHtmlParser(data.description)}</div>
        )}
      </div>

      {topItems.length > 0 && (
        <div className="guides-cell-featured-links">
          {topItems.map((item, index) => (
            <InternalLink className="guides-cell-featured-link" href={item.url} key={index}>
              <img src={`https://static-helpcenter.onlyoffice.com/images/icons/${item.slug_id}.react.svg`} alt={item.name} />
              <div>{item.name}</div>
            </InternalLink>
          ))}
        </div>
      )}

      <div className="guides-cell-columns">
        <div className="guides-cell-column">
          {connectorsSlug ? (
            <ConnectorsColumn t={t} title={t("ForDocs")} articles={docsArticles} />
          ) : (
            items?.slice(0, Math.ceil(items?.length / 2)).map((item, index) => (
              <GroupColumn t={t} key={index} item={item} slugId={slugId} isClient={isClient} />
            ))
          )}
        </div>

        <div className="guides-cell-column">
          {connectorsSlug ? (
            <ConnectorsColumn t={t} title={t("ForDocSpace")} articles={docspaceArticles} />
          ) : (
            items?.slice(Math.ceil(items.length / 2)).map((item, index) => (
              <GroupColumn t={t} key={index} item={item} slugId={slugId} isClient={isClient} />
            ))
          )}
        </div>
      </div>
    </StyledGuidesCell>
  );
};

export default GuidesCell;