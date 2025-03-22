import { Header } from '@/shared/component';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    docs: {
      description: {
        component:
          'Header 컴포넌트는 애플리케이션의 상단 내비게이션 바 역할을 합니다.',
      },
    },
  },
};

export default meta;

const Template = (args) => <Header {...args} />;

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
