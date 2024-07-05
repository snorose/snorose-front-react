import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <main>
      <button
        onClick={(event) => {
          event.stopPropagation();
          setIsSidebarOpen((prev) => !prev);
        }}
      >
        사이드바 열기
      </button>
      메인홈
      {isSidebarOpen && <Sidebar closeSidebar={closeSidebar} />}
    </main>
  );
}
