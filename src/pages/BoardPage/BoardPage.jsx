import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function BoardPage() {
  const { pathname } = useLocation();

  return (
    <main>
      {pathname === '/board' && <div>게시판</div>}
      <Outlet />
    </main>
  );
}
