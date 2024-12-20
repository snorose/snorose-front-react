import { useSidebarStore } from '@/stores';
import { Icon } from '@/components/Icon';

export default function MenuIcon() {
  const open = useSidebarStore((state) => state.open);

  return (
    <>
      <Icon
        id='hamburger-menu'
        width={23}
        height={16}
        onClick={(event) => {
          event.stopPropagation();
          open();
        }}
        style={{ cursor: 'pointer' }}
      />
    </>
  );
}
