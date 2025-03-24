import { AppBar } from '@/shared/component';

const meta = {
  title: 'Layout/AppBar',
  component: AppBar,
  parameters: {
    docs: {
      description: {
        component:
          'AppBar 컴포넌트는 상단 네비게이션 바 역할을 하는 컴포넌트로, 제목을 표시하며 배경색을 설정할 수 있습니다.\n\n' +
          '또한, `notFixed` 속성을 통해 고정 여부를 조정할 수 있습니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '컴포넌트 내 제목 설정',
    },
    backgroundColor: {
      control: 'color',
      description: '배경 색상 설정',
    },
    notFixed: {
      control: 'boolean',
      description: '컴포넌트의 위치 고정 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

const Template = (args) => <AppBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '시험 후기',
  notFixed: false,
};
Default.parameters = {
  docs: {
    description: {
      story: '기본 `AppBar`로 제목만 표시되는 형태입니다.',
    },
  },
};

export const WithBackground = Template.bind({});
WithBackground.args = {
  title: '시험 후기',
  backgroundColor: 'var(--blue-0)',
  notFixed: false,
};
WithBackground.parameters = {
  docs: {
    description: {
      story: '`backgroundColor` 속성을 변경하여 배경색이 있는 AppBar입니다.',
    },
  },
};

export const NotFixed = Template.bind({});
NotFixed.args = {
  title: '시험 후기',
  backgroundColor: 'var(--blue-0)',
  notFixed: true,
};
NotFixed.parameters = {
  docs: {
    description: {
      story:
        '`notFixed` 속성을 `true`로 설정하여 스크롤에 따라 움직이는 AppBar입니다.',
    },
  },
};
