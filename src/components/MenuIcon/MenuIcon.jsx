import { useState } from 'react';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function MenuIcon() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Icon
        id='hamburger'
        width={23}
        height={16}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      />
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
