import { FetchLoadingOverlay } from '@/shared/component';

const meta = {
  title: 'Component/FetchLoadingOverlay',
  component: FetchLoadingOverlay,
  parameters: {
    docs: {
      description: {
        component:
          '**FetchLoadingOverlay 컴포넌트**는 데이터 로딩 시 오버레이와 함께 로딩 메시지를 표시합니다. 내부적으로 FetchLoading 컴포넌트를 포함하며, `text` props를 통해 메시지를 커스터마이징할 수 있습니다.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: '로딩 중 화면에 표시할 텍스트',
    },
  },
};

export default meta;

const Template = (args) => (
  <div style={{ height: '200px', position: 'relative' }}>
    <FetchLoadingOverlay {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  text: '불러오는 중입니다...',
};
