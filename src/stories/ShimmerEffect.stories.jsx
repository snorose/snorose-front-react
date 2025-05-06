import ShimmerEffect from '@/shared/component/suspense/ShimmerEffect/ShimmerEffect';

const shimmerEffectStoryConfig = {
  title: 'Component/ShimmerEffect',
  component: ShimmerEffect,
  parameters: {
    docs: {
      description: {
        component:
          'ShimmerEffect 컴포넌트는 자식에게 반짝이는 애니메이션 style을 추가하는 컴포넌트입니다.\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `CarouselSkeleton.jsx`: Suspense(로딩해야하는거 로딩되기 이전에 특정 컴포넌트가 보이게 할 수 있음)를 사용해서 Carousel이 로딩되기 이전에 반짝이는 회색 패널을 보여줍니다.\n\n' +
          '- `HomeBesooktSkeleton.jsx`:  비슷하게 HomeBesookt가 로딩되기 이전에 반짝이는 회색 패널을 보여줍니다.\n\n' +
          '- `HomeCardSkeleton.jsx`: 비슷하게 HomeCard가 로딩되기 이전에 반짝이는 회색 패널을 보여줍니다.',
      },
    },
  },
  args: {
    children: (
      <div
        style={{
          marginBottom: '2.5625rem',
          width: '100%',
          aspectRatio: 3,
          background:
            'linear-gradient(45deg, var(--grey-2) 25%, var(--grey-3) 50%, var(--grey-2) 75%)',
          backgroundSize: '200% 100%',
        }}
      ></div>
    ),
  },
  argTypes: {
    children: {
      description: '반짝이는 애니메이션을 받는 DOM입니다.\n\n',
      table: {
        type: {
          summary: 'DOM',
        },
      },
      control: { type: 'object' },
    },
  },
};
export default shimmerEffectStoryConfig;

const Template = (args) => {
  return <ShimmerEffect {...args} />;
};
export const Default = Template.bind({});
Default.args = {};
