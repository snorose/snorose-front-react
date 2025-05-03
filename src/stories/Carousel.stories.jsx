import Carousel from '../feature/home/component/Carousel/Carousel';

const meta = {
  title: 'Component/Carousel/Carousel',
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component:
          'Carousel 컴포넌트는 홈 화면에 사용되는 배너 캐러셀 컴포넌트입니다.\n\n' +
          ' 자동 슬라이드 기능과 Swiper 기반의 네비게이션, 페이지네이션이 포함되어 있습니다.',
      },
    },
  },
  argTypes: {
    delay: {
      control: { type: 'number' },
      description: '자동 슬라이드 간의 지연 시간(ms)',
      defaultValue: 3000,
    },
    className: {
      control: { type: 'text' },
      description: '추가 스타일을 위한 클래스명',
    },
  },
};

export default meta;

const Template = (args) => <Carousel {...args} />;

export const Default = Template.bind({});
Default.args = { delay: 3000, className: '' };
