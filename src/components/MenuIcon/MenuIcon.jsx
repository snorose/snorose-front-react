import { useState } from 'react';

import { Icon } from '@/components/Icon';
import { Sidebar } from '@/components/Sidebar';

export default function MenuIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Icon
        id='hamburger-menu'
        width={23}
        height={16}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        style={{ cursor: 'pointer' }}
      />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
