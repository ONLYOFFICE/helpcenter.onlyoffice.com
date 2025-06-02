const GenerateTreeViewData = (data) => {
  const sortByIconOrPositionOrNameTitle = (a, b) => (b.icon_small?.data?.url ? 1 : 0) - (a.icon_small?.data?.url ? 1 : 0) || (a.position ?? Infinity) - (b.position ?? Infinity) || (a.name || a.title).localeCompare(b.name || b.title);
  const sortByPositionOrTitle = (a, b) => (a.position ?? Infinity) - (b.position ?? Infinity) || (a.title).localeCompare(b.title);

  return {
    children: data?.data?.sort(sortByIconOrPositionOrNameTitle).map((item) => {
      const slug_id = `${item?.slug_id === "docs" ? "docs" : `${item?.slug_id}s`}`;

      return {
        name: item?.name,
        slug_id: item?.slug_id,
        children: [...(item?.[`category_${slug_id}`] ?? []), ...(item?.articles ?? [])]?.sort(sortByIconOrPositionOrNameTitle).map((item2) => ({
          name: item2?.name || item2?.title,
          url: item2?.url,
          children: [...(item2?.[`level_2_${slug_id}`] ?? []), ...(item2?.[`article_${slug_id}`] ?? [])].sort(sortByIconOrPositionOrNameTitle).map((item3) => ({
            name: item3?.name || item3?.title,
            url: item3?.url,
            children: [
              ...(item3?.[`level_3_${slug_id}`] ?? [])?.sort(sortByIconOrPositionOrNameTitle).map((item4) => ({
                name: item4?.name || item4?.title,
                url: item4?.url,
                children: [
                  ...(item4?.[`level_4_${slug_id}`] ?? []).sort(sortByIconOrPositionOrNameTitle).map((item5) => ({
                    name: item5?.name || item5?.title,
                    url: item5?.url,
                    children: item5?.[`article_${slug_id}`]?.data?.sort(sortByPositionOrTitle).map((item6) => ({
                      name: item6?.name || item6?.title,
                      url: item6?.url,
                    }))
                  })),
                  ...(item4?.[`article_${slug_id}`] ?? [])?.sort(sortByPositionOrTitle).map((item5) => ({
                    name: item5?.name || item5?.level_4_title || item5?.title,
                    url: item5?.url,
                  })),
                ]
              })),
              ...(item3?.[`article_${slug_id}`] ?? [])?.sort(sortByPositionOrTitle).map((item4) => ({
                name: item4?.name || item4?.level_4_title || item4?.title,
                url: item4?.url,
              })),
            ],
          })),
        })),
      };
    }),
  };
};

export default GenerateTreeViewData;