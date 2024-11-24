export const isCommunityBoard = (boardTextId) => {
  if (!boardTextId) return false;
  return ['first-snow', 'large-snow', 'permanent-snow'].includes(boardTextId);
};
