import ServerErrorFallback from './ServerErrorFallback';

const serverErrorFallbackStoryConfig = {
  component: ServerErrorFallback,
  parameters: {
    docs: {
      description: {
        component:
          'ServerErrorFallback 컴포넌트는 ErrorBoundary의 자식 컴포넌트가 렌더링 실패할 시 대신 렌더링되는 FallbackComponent입니다.\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `CarouselErrorFallback.jsx`: Carousel이 서버 에러로 렌더링 될 수가 없을 때, ServerErrorFallback을 대신 띄워줍니다.\n\n' +
          '- `CommentsErrorFallback.jsx`: 아래의 모든 코드에서 ServerErrorFallback은 모두 비슷하게 작동하니 이하 생략하겠습니다.\n\n' +
          '- `SearchExamReviewsErrorFallback.jsx`\n\n' +
          '- `HomeBesooktErrorFallback.jsx`\n\n' +
          '- `PostsErrorFallback.jsx`\n\n' +
          '- `PointLogsErrorFallback.jsx`\n\n' +
          '- `SearchResultsErrorFallback.jsx`\n\n',
      },
    },
  },
  args: {
    reset: () => {},
  },
  argTypes: {
    reset: {
      description:
        'ErrorBoundary(MainPage.jsx에 존재)의 resetErrorBoundary 함수입니다.\n\n' +
        'ErrorBoundary는 자신의 FallbackComponent(자식 컴포넌트 렌더링 실패시 나타나는 컴포넌트)에게 자동으로 error와 resetErrorBoundary을 건네는데, 여기서 error은 어떤 에러가 생겼는지에 대한 간략한 설명이 담긴 object이고 (Error Object) resetErrorBoundary는 리셋을 위한 함수입니다.\n\n' +
        '해당 함수를 실행하면 ErrorBoundary의 상태를 리셋할 수 있으며, ErrorBoundary의 자식 컴포넌트를 다시 렌더링해봅니다.\n\n' +
        'ServerErrorFallback은 reset을 직접 사용하지는 않고 ResetButton으로 전달해줍니다.',
      table: {
        type: {
          summary: 'function',
        },
      },
      control: { type: null },
    },
  },
};
export default serverErrorFallbackStoryConfig;

const Template = (args) => {
  return <ServerErrorFallback {...args} />;
};
export const Default = Template.bind({});
Default.args = {};
