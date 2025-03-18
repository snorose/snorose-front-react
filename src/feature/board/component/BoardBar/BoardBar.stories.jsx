import BoardBar from './BoardBar';
import firstSnow from '@/assets/images/firstSnow-board-page.svg';

const meta = {
  title: 'Components/BoardBar',
  component: BoardBar,
  parameters: {
    docs: {
      description: {
        component:
          'BoardBar 컴포넌트는 특정 게시판 정보를 표시하고, 사용자가 해당 게시판으로 이동할 수 있도록 돕는 컴포넌트입니다.\n\n' +
          ' 이 컴포넌트는 스노로즈 커뮤니티의 게시판 조회 페이지에서 활용되며, 게시판 정보는 `boardMenus` 파일을 통해 불러옵니다.',
      },
    },
  },
  argTypes: {
    data: {
      control: 'object',
      description: '게시판의 데이터 (id, textId, title, desc, image)',
    },
  },
};

export default meta;

const Template = (args) => <BoardBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: 21,
    textId: 'first-snow',
    title: '첫눈온방',
    desc: '새내기 전용 커뮤니티',
    image: firstSnow,
  },
};
