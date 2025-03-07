import { useSidebarStore } from '@/shared/store';
import { Icon } from '@/shared/component';

export default function MenuIcon() {
  const open = useSidebarStore((state) => state.open);

  return (
    <>
      <Icon
        id='hamburger'
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
