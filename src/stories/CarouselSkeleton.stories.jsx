import CarouselSkeleton from '../feature/home/component/Carousel/CarouselSkeleton';

const meta = {
  title: 'Component/Carousel/CarouselSkeleton',
  component: CarouselSkeleton,
  parameters: {
    docs: {
      description: {
        component: `
**CarouselSkeleton**은 Carousel 컴포넌트가 데이터를 불러오는 동안  
사용자에게 로딩 중임을 시각적으로 보여주는 스켈레톤 컴포넌트입니다.  
내부적으로 \`ShimmerEffect\`를 사용하여 자연스러운 애니메이션 효과를 제공합니다.
        `,
      },
    },
  },
};

export default meta;

const Template = (args) => <CarouselSkeleton {...args} />;

export const Default = Template.bind({});
