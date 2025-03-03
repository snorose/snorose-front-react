import Header from './Header';

const headerStoryConfig = {
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

export default headerStoryConfig;

const DefaultTemplate = (args) => <Header {...args} />;

export const LoggedOut = DefaultTemplate.bind({});
LoggedOut.args = {};
