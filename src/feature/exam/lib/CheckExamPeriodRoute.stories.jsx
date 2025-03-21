import CheckExamPeriodRoute from './CheckExamPeriodRoute';

const checkExamPeriodRouteStoryConfig = {
  component: CheckExamPeriodRoute,
  parameters: {
    docs: {
      description: {
        component:
          'CheckExamPeriodRoute 컴포넌트는 어떤 페이지를 띄우기 전에 시험후기 기간인지 확인해주는 컴포넌트입니다.\n\n' +
          '만일 시험기간이라면 alert를 띄우고, 시험기간이 아니라면 해당 페이지를 띄워줍니다.\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `router.js`: ExamReviewWritePage을 열때 현재 날짜를 확인하고, 시험기간이 아니면 "시험후기 작성 기간이 아닙니다" alert을 띄우고 메인 페이지로 넘어갑니다.\n',
      },
    },
  },
  args: {
    children: <div></div>,
  },
  argTypes: {
    children: {
      description:
        '만약 시험후기 작성 기간이라면 띄워주는 DOM입니다.\n\n' +
        'ex) route.js에서는 ExamReviewWritePage를 넘겨줍니다.',
      table: {
        type: {
          summary: 'DOM',
        },
      },
      control: { type: null },
    },
  },
};
export default checkExamPeriodRouteStoryConfig;

const Template = (args) => <CheckExamPeriodRoute {...args} />;
export const Default = Template.bind({});
Default.args = {};
