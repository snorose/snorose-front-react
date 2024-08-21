import { BOARD_MENUS } from '@/constants';

export const getBoardTextId = (boardId) => {
  return BOARD_MENUS.find(({ id }) => id === boardId).textId;
};
