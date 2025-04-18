import { NoticeBar } from '../feature/board/component';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Component/NoticeBar',
  component: NoticeBar,
  parameters: {
    docs: {
      description: {
        component:
          '**NoticeBar 컴포넌트**는 공지사항 페이지에서 사용되며, 제목, 내용, 작성일, 댓글 수, 좋아요 수 등을 간단히 요약해 보여주는 UI입니다.<br/>클릭 시 상세 페이지로 이동하는 등의 동작을 연결할 수 있습니다.',
      },
    },
  },
  argTypes: {
    data: {
      description: '게시물 데이터 객체',
      control: 'object',
    },
    onClick: {
      description: '클릭 시 호출되는 함수',
      action: 'clicked',
    },
  },
};

export default meta;

const Template = (args) => <NoticeBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    title: '스노로즈 2025년 1월 회계 보고',
    content:
      '안녕하세요, 스노로즈입니다. 2025년 1월 회계 내역을 보고드립니다. 아래 링크를 통해 확인하실 수 있으며, 숙명 메일 계정으로만 조회가 가능합니다. 개인정보 보호를 위해 이름 가운데 자리를 마스킹하였습니다. 지출 내역에 대한 영수증도 함께 확인하실 수 있습니다.',
    createdAt: '2024-04-13T15:00:00Z',
    commentCount: 12,
    likeCount: 45,
  },
  onClick: action('NoticeBar Clicked'),
};
