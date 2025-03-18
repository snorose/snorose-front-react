import Submit from './Submit';

const submitStoryConfig = {
  component: Submit,
  parameters: {
    docs: {
      description: {
        component:
          'Submit 컴포넌트는 페이지가 준비가 되었을 때 누를 수 있도록 하는 submit 버튼 컴포넌트입니다.\n\n' +
          '버튼 내의 문구를 정할 수 있으며, 버튼이 누를 수 있게 되었을 때는 짙은 파란색으로 변합니다.\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `FindIdPage.jsx`\n\n' +
          '- `FindPwPage.jsx`\n\n' +
          '- `FoundIdPage.jsx`\n\n' +
          '- `NotFoundIdPage.jsx`\n\n' +
          '- `NotFoundPwPage.jsx`\n\n' +
          '- `AccountInfoPage.jsx`\n\n' +
          '- `AuthorizationPage.jsx`\n\n' +
          '- `UserInfoPage.jsx`\n\n' +
          '- `SignUpFailurePage.jsx`\n\n' +
          '- `SignUpSuccessPage.jsx`\n\n',
      },
    },
  },
  args: {
    btnName: '다음으로',
    className: 'ready',
    props: '',
  },
  argTypes: {
    btnName: {
      description: '버튼 내의 문구를 정합니다.\n',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    className: {
      description:
        'Submit이 가능한지 알려주는 string입니다.\n\n' +
        'ready(버튼 못 누름)/wrong(버튼 못 누름)/right(버튼 누를수 있고 파랗게 변함)중 하나입니다.\n * className 값에 따라 적용되는 style이 다릅니다. (연파랑 or 짙파랑)\n * ready라면 e.preventDefault 때문에 아무런 작용이 안 일어납니다.',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: 'radio',
      },
      options: ['ready', 'wrong', 'right'],
    },
    props: {
      description:
        '컴포넌트 자체에서 추가 기능을 넣을 수 있습니다.\n\n' +
        'ex) AccountInfoPage에서는 onClick={() => setStage((prev) => prev + 1)}가 props로 넘어오는데, 누르면 회원가입에서 다음 스테이지로 넘어가는 기능을 한다. ',
      table: {
        type: {},
      },
      control: {
        type: null,
      },
    },
  },
};
export default submitStoryConfig;

const Template = (args) => <Submit {...args} />;
export const Default = Template.bind({});
Default.args = {};
