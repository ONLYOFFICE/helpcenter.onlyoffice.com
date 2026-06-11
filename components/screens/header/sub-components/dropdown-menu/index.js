import { StyledDropdownMenu, ColLink, ColTitle, Column } from "./styled-dropdown-menu";
import { useEffect, useState } from "react";

const desktopGroupsConfigDesktop = [
    ["installation", "ai"],
    ["configuration"],
    ["userguides"],
    ["connecting_to_cloud"],
    ["security", "development"],
    ["macros"]
];

const desktopGroupsConfigMobile = [
    ["installation", "ai", "security"],
    ["configuration", "development"],
    ["userguides", "macros"],
    ["connecting_to_cloud"]
];

const DropdownMenu = ({ item }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1360);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const config = isMobile
        ? desktopGroupsConfigMobile
        : desktopGroupsConfigDesktop;

    const isConnectors = item.slug_id === "integration";
    const isDesktop = item.slug_id === "desktop";
    const isDocspace = item.slug_id === "docspace";
    const getCategoryKey = (item) => {
        const keys = Object.keys(item);
        return keys.find((k) => k.startsWith("category_"));
    };

   if (isConnectors) {
    const articles = item.articles || [];
    if (!articles.length) return null;

    const docsArticles = articles.filter(
        (a) => !a.url?.includes("-docspace") &&
               !a.url?.includes("zapier") &&
               !a.url?.includes("zoom")
    ).sort((a, b) => (a.name || a.title).localeCompare(b.name || b.title));
    const docspaceArticles = articles.filter(
        (a) => a.url?.includes("-docspace") ||
               a.url?.includes("zapier") ||
               a.url?.includes("zoom")
    ).sort((a, b) => (a.name || a.title).localeCompare(b.name || b.title));

    const CHUNK_SIZE = 9;

    const docsChunks = [];
    for (let i = 0; i < docsArticles.length; i += CHUNK_SIZE) {
        docsChunks.push(docsArticles.slice(i, i + CHUNK_SIZE));
    }

    const totalCols = docsChunks.length + 1;

    return (
        <StyledDropdownMenu breakpointCols={totalCols} className="nav-submenu integration">
            {docsChunks.map((chunk, i) => (
                <Column key={`docs-${i}`} style={{ paddingTop: i !== 0 ? '28px' : '0' }}>
                    {i === 0 && <ColTitle as="span">Connectors for Docs</ColTitle>}
                    {chunk.map((link) => (
                        <ColLink key={link.id} href={link.url}>{link.title}</ColLink>
                    ))}
                </Column>
            ))}
            <Column>
                <ColTitle as="span">Connectors for DocSpace</ColTitle>
                {docspaceArticles.map((link) => (
                    <ColLink key={link.id} href={link.url}>{link.title}</ColLink>
                ))}
            </Column>
        </StyledDropdownMenu>
    );
}

    const categoryKey = getCategoryKey(item);
    if (!categoryKey) return null;

    const categories = item[categoryKey];
    if (!categories?.length) return null;

    const levelKey = Object.keys(categories[0] || {}).find((k) => k.startsWith("level_2_"));
    const articleKey = Object.keys(categories[0] || {}).find((k) => k.startsWith("article_"));

    const cols = categories
        .filter((cat) => {
            const hasLevel2 = levelKey && cat[levelKey]?.length > 0;
            const hasArticles = articleKey && cat[articleKey]?.length > 0;
            return hasLevel2 || hasArticles;
        })
        .sort((a, b) => {
            const posA = a.position ?? Infinity;
            const posB = b.position ?? Infinity;

            if (posA !== posB) return posA - posB;

            return (a.id ?? 0) - (b.id ?? 0);
        });

    if (!cols.length) return null;


    let groups = [];

    if (isDesktop) {
        const map = new Map(cols.map((c) => [c.slug_id, c]));

        groups = config.map((group) =>
            group
                .map((slug) => map.get(slug))
                .filter(Boolean)
        );
    } else {
        groups = cols.map((c) => [c]);
    }

    const breakpointColumnsObj = isDesktop ? {
        default: 6,
        1360: 4,
    } : isDocspace ? {
        default: 5,
        1200: 4,
    } : null;

    return (
        <StyledDropdownMenu breakpointCols={breakpointColumnsObj ? breakpointColumnsObj : groups.length} className={`nav-submenu ${item.slug_id}`}>
            {groups.map((group, i) => (
                <Column key={i}>
                    {group.map((cat) => {
                        const level2 = (levelKey && cat[levelKey]) || [];
                        const articles = (articleKey && cat[articleKey]) || [];

                        const links = [...level2, ...articles].sort((a, b) => {
                            const posA = a.position ?? Infinity;
                            const posB = b.position ?? Infinity;

                            if (posA !== posB) return posA - posB;
                            return (a.id ?? 0) - (b.id ?? 0);
                        });

                        return (
                            <div key={cat.id}>
                                <ColTitle href={cat.url}>{cat.name}</ColTitle>
                                {links.map((link) => (
                                    <ColLink key={link.id} href={link.url}>
                                        {link.name || link.title}
                                    </ColLink>
                                ))}
                            </div>
                        );
                    })}
                </Column>
            ))}

        </StyledDropdownMenu>
    );
};

export default DropdownMenu;