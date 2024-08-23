import { BOARD_MENUS } from '@/constants';

export const getBoardTextId = (boardId) => {
  return BOARD_MENUS.find(({ id }) => id === boardId).textId;
};

export const getBoardTitleToTextId = (boardName) => {
  return BOARD_MENUS.find(({ title }) => title === boardName).textId;
};
