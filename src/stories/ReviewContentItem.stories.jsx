import ReviewContentItem from '@/feature/exam/component/ReviewContentItem/ReviewContentItem';
import { FLEX_ALIGN } from '@/feature/exam/constant';

const reviewContentItemStoryConfig = {
  component: ReviewContentItem,
  parameters: {
    docs: {
      description: {
        component:
          'ReviewContentItem 컴포넌트는 시험후기 정보를 담아주는 컴포넌트입니다.\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `ExamReviewPage.jsx`: 여러개의 ReviewContentItem을 사용하여 화면에 시험후기 정보를 보여주는 페이지입니다.\n',
      },
    },
  },
  args: {
    tag: '강의명',
    value: '인간과우주',
    align: FLEX_ALIGN.center,
  },
  argTypes: {
    tag: {
      description:
        'PostBar에 띄워줘야하는 여러 정보들이 담겨져 있습니다.\n\n' +
        'ex) 강의명, 교수, 강의 종류, 수강학기, 시험 종류, P/F, 온라인 수업, 시험유형및문항수',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    value: {
      description:
        '시험후기 정보 값이 들어갑니다.\n\n' +
        'ex) "인간과우주", "정홍" "교양선택" "24-2학기" "기말고사" "X" "총60문항/객관식7문항/ox53문항"',
      table: {
        type: {
          summary: 'text',
        },
      },
      control: {
        type: 'text',
      },
    },
    align: {
      description:
        'align 관련된 css중 어떤 것을 선택해야하는지 결정합니다. \n\n' +
        '여러 align관련 string값을 담은 align.js에서 가져온 object(FLEX_ALIGN)에서 하나의 string을 고릅니다.\n\n' +
        '(FLEX_ALIGN.center이나 FLEX_ALIGN.flexStart중 하나)',
      default: FLEX_ALIGN.center,
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: 'select',
      },
      options: [FLEX_ALIGN.center, FLEX_ALIGN.flexStart],
    },
  },
};
export default reviewContentItemStoryConfig;

const Template = (args) => <ReviewContentItem {...args} />;
export const Default = Template.bind({});
Default.args = {};
