import { MainPageListItem } from '../feature/home/component';

const meta = {
  title: 'Component/MainPageListItem',
  component: MainPageListItem,
  parameters: {
    docs: {
      description: {
        component:
          '**MainPageListItem 컴포넌트**는 게시글 리스트에 사용되며, 작성자, 생성일, 제목, 내용, 게시판명, 이미지 등을 시각적으로 구성합니다.',
      },
    },
  },
  argTypes: {
    postId: {
      description: '게시글 ID',
      control: 'number',
    },
    displayName: {
      description: '작성자 이름',
      control: 'text',
    },
    createdAt: {
      description: '게시글 작성 시각',
      control: 'date',
    },
    title: {
      description: '게시글 제목',
      control: 'text',
    },
    overview: {
      description: '게시글 내용',
      control: 'text',
    },
    boardId: {
      description: '게시판 ID',
      control: 'number',
    },
    boardName: {
      description: '게시판 이름',
      control: 'text',
    },
  },
};

export default meta;

const Template = (args) => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <MainPageListItem {...args} />
    </ul>
  );
};

export const Default = Template.bind({});
Default.args = {
  postId: 1,
  displayName: '눈송이',
  createdAt: new Date().toISOString(),
  title: '새로운 소식이 도착했습니다!',
  overview: '이번 주 커뮤니티 활동 요약과 주요 업데이트를 확인해보세요.',
  boardId: 101,
  boardName: '첫눈온방',
};
