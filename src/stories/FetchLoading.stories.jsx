import { FetchLoading } from '@/shared/component';

const meta = {
  title: 'Component/FetchLoading',
  component: FetchLoading,
  parameters: {
    docs: {
      description: {
        component: `
**FetchLoading 컴포넌트**는 데이터를 불러오는 중 표시되는 로딩 UI입니다.  
기본적으로 중앙에 클라우드 아이콘과 텍스트를 세로 정렬로 표시하며, \`animation\` prop을 통해 아이콘 회전 여부를 제어할 수 있습니다.
        `.trim(),
      },
    },
  },
  argTypes: {
    animation: {
      table: { disable: true },
    },
    children: {
      control: 'text',
      description: '로딩 상태를 설명하는 텍스트',
      type: { name: 'string' },
    },
  },
};

export default meta;

const Template = (args) => <FetchLoading {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '데이터를 불러오고 있습니다...',
  animation: true,
};
