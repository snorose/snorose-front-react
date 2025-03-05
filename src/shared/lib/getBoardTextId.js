import { BOARD_MENUS } from '@/shared/constant';

export const getBoardTextId = (boardId) => {
  return BOARD_MENUS.find(({ id }) => id === boardId)?.textId;
};

export const getBoardTitleToTextId = (boardName) => {
  return BOARD_MENUS.find(({ title }) => title === boardName)?.textId;
};

export const getBoard = (boardTextId) => {
  return BOARD_MENUS.find((menu) => menu.textId === boardTextId);
};
