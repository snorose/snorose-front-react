import React from 'react';
import { useLocation } from 'react-router-dom';

export default function BoardListPage() {
  const { pathname } = useLocation();
  const currentPath = pathname.split('/')[2];
  let currentBoard = '';

  if (currentPath === 'first-snow') {
    currentBoard = '첫눈온방';
  } else if (currentPath === 'large-snow') {
    currentBoard = '함박눈방';
  } else if (currentPath === 'permanent-snow') {
    currentBoard = '만년설방';
  } else if (currentPath === 'besookt') {
    currentBoard = '베숙트';
  }

  return <div>{currentBoard}</div>;
}
