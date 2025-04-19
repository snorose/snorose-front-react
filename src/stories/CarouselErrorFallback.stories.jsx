import CarouselErrorFallback from '../feature/home/component/Carousel/CarouselErrorFallback';

const meta = {
  title: 'Component/Carousel/CarouselErrorFallback',
  component: CarouselErrorFallback,
  parameters: {
    docs: {
      description: {
        component: `
**CarouselErrorFallback**은 Carousel 컴포넌트에서 오류가 발생했을 때 표시되는 예외 처리 UI입니다.  
내부적으로 \`ServerErrorFallback\` 컴포넌트를 사용하며, 사용자가 재시도할 수 있도록 \`resetErrorBoundary\` 콜백을 전달합니다.
        `,
      },
    },
  },
  argTypes: {
    error: {
      control: false,
      description: '발생한 에러 객체 (표시에는 사용되지 않음)',
    },
    resetErrorBoundary: {
      action: 'resetErrorBoundary called',
      description: '에러 복구를 위한 콜백 함수',
    },
  },
};

export default meta;

const Template = (args) => <CarouselErrorFallback {...args} />;

export const Default = Template.bind({});
Default.args = { resetErrorBoundary: () => {} };
