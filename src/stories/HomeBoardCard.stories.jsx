import { HomeBoardCard } from '@/feature/home/component';

const meta = {
  title: 'Component/HomeBoardCard',
  component: HomeBoardCard,
  parameters: {
    docs: {
      description: {
        component:
          '홈 화면에서 사용되는 카드 컴포넌트입니다.\n\n' +
          ' 로그인 여부에 따라 표시되는 텍스트와 배경 이미지가 달라집니다.',
      },
    },
  },
  argTypes: {
    to: {
      description: '카드를 클릭했을 때 이동할 경로',
    },
    name: {
      description: '로그인한 사용자에게 보여질 카드의 제목 텍스트',
    },
    desc: {
      description: '로그인한 사용자에게 보여질 카드의 설명 텍스트',
    },
    backgroundImage: {
      description: '로그인한 사용자에게 보여질 카드의 배경 이미지 URL 입력',
    },
  },
};

export default meta;

const Template = (args) => <HomeBoardCard {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
