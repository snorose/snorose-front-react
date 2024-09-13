const PAGE_SIZE = 10;

export const flatPaginationCache = (data) => {
  return data && !data.pages.includes(undefined)
    ? data.pages.flatMap((page) => page.data)
    : [];
};

export const chunkArray = (array, size) => {
  const result = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
};

export const toPaginationCacheFormat = (flattenPaginationCache) => {
  const pageChunk = chunkArray(flattenPaginationCache, PAGE_SIZE);
  const lastPageParam = pageChunk.length - 1;

  const newPages = pageChunk //
    .map((page, index) => ({
      hasNext: index === lastPageParam ? false : true,
      data: page,
    }));

  const newPageParams = Array.from({ length: lastPageParam + 1 }, (_, i) => i);

  return {
    pages: newPages,
    pageParams: newPageParams,
  };
};
