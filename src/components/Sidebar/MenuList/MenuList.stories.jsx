import MenuList from './MenuList';
import styles from './MenuList.module.css';
import { useSidebarStore } from '@/stores';

const menuListStoryConfig = {
  component: MenuList,
  parameters: {
    docs: {
      description: {
        component:
          'MenuList 컴포넌트는 메인페이지 우측 상단의 햄버거 아이콘을 누르면 나타나는 사이드바 속 대제목들 아래의 링크 목록입니다.\n\n' +
          '부모 컴포넌트인 Sidebar에서 보낸 items가 있을 경우, 클릭 시 to의 Link로 이동하는 submenu들을 띄워준다.\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `Sidebar.jsx`\n\n',
      },
    },
  },
  args: {
    className: styles.item,
    items: [
      { to: '/board/first-snow', name: '첫눈온방' },
      { to: '/board/large-snow', name: '함박눈방' },
      { to: '/board/permanent-snow', name: '만년설방' },
      { to: '/board/besookt', name: '베숙트' },
    ],
  },
  argTypes: {
    className: {
      description: '추가적으로 부여할 스타일입니다.\n',
      table: {
        type: {
          summary: 'CSS',
        },
      },
      control: { type: null },
    },
    items: {
      description: `띄워야하는 submenu들입니다.\n\n {to(링크), name(submenu 이름)} object들의 array 형식입니다.`,
      table: {
        type: {
          summary: 'array',
        },
      },
      control: {
        type: 'object',
      },
    },
  },
};
export default menuListStoryConfig;

const Template = (args) => {
  const open = useSidebarStore((state) => state.open);
  open();
  return <MenuList {...args} />;
};
export const Default = Template.bind({});
Default.args = {};
