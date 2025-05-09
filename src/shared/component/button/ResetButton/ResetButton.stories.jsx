import ResetButton from './ResetButton';

const resetButtonStoryConfig = {
  component: ResetButton,
  parameters: {
    docs: {
      description: {
        component:
          'ResetButton 컴포넌트는 resetErrorBoundary 함수를 reset props로 받아서, 누르면 ErrorBoundary의 자식 컴포넌트를 re-render하는 아이콘을 띄웁니다.\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `ServerErrorFallback.jsx`: 서버 에러가 나서 못 띄운 컴포넌트 대신 나타나는 컴포넌트이다. 요청 처리를 실패했다는 메세지와 함께 re-rendering 버튼인 ResetButton도 띄워줍니다.\n\n',
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
        '해당 함수를 실행하면 ErrorBoundary의 상태를 리셋할 수 있으며, ErrorBoundary의 자식 컴포넌트를 다시 렌더링해봅니다.',
      table: {
        type: {
          summary: 'function',
        },
      },
      control: { type: null },
    },
  },
};
export default resetButtonStoryConfig;

const Template = (args) => {
  return <ResetButton {...args} />;
};
export const Default = Template.bind({});
Default.args = {};
