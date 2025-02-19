import Footer from './Footer';

const footerStoryConfig = {
  component: Footer,
  parameters: {
    docs: {
      description: {
        component:
          'Footer 컴포넌트는 애플리케이션의 하단에 위치하며, 서비스 이용과 관련된 정보를 제공합니다.',
      },
    },
  },
};

export default footerStoryConfig;

export const Default = () => <Footer />;
