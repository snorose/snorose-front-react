import { ListHeader } from '../feature/home/component';

const meta = {
  title: 'Component/ListHeader',
  component: ListHeader,
  parameters: {
    docs: {
      description: {
        component:
          '**ListHeader 컴포넌트**는 메인페이지 내 섹션 제목과 함께 "더보기" 링크를 제공합니다. 게시글 목록 위에 사용됩니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '섹션의 제목 텍스트',
    },
    to: {
      control: 'text',
      description: '“더보기” 버튼 클릭 시 이동할 경로',
    },
  },
};

export default meta;

const Template = (args) => <ListHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '베숙트',
  to: '/board/besookt',
};
