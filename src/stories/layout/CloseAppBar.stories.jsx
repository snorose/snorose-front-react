import { ActionButton, CloseAppBar } from '@/shared/component';

const meta = {
  title: 'Layout/CloseAppBar',
  component: CloseAppBar,
  parameters: {
    docs: {
      description: {
        component:
          'CloseAppBar는 상단 네비게이션 바에서 닫기 버튼을 제공하는 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    alignRight: {
      control: 'boolean',
      description: '닫기 버튼을 오른쪽 정렬할지 여부',
      table: {
        defaultValue: { summary: 'space-between' },
      },
    },
    stroke: { control: 'color', description: '아이콘의 색상' },
    notFixed: { control: 'boolean', description: '앱바의 고정 여부' },
    backgroundColor: {
      control: 'color',
      description: '배경 색상',
      table: {
        defaultValue: { summary: '#fff' },
      },
    },
    onClose: {
      action: 'closed',
      description: '닫기 버튼 클릭 시 실행되는 핸들러',
    },
    children: {
      control: 'text',
      description: '닫기 버튼 옆에 위치하는 콘텐츠',
    },
  },
};

export default meta;

const Template = (args) => <CloseAppBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  alignRight: false,
  notFixed: false,
  stroke: 'black',
  backgroundColor: '#fff',
};
Default.parameters = {
  docs: {
    description: {
      story: '기본적으로 왼쪽 정렬된 닫기 버튼이 있는 CloseAppBar입니다.',
    },
  },
};

export const AlignRight = Template.bind({});
AlignRight.args = {
  ...Default.args,
  alignRight: true,
};
AlignRight.parameters = {
  docs: {
    description: {
      story: '닫기 버튼이 오른쪽에 정렬된 CloseAppBar입니다.',
    },
  },
};

export const withText = Template.bind({});
withText.args = {
  ...Default.args,
  children: <p>수정</p>,
};
withText.parameters = {
  docs: {
    description: {
      story: '닫기 버튼 옆에 텍스트 요소가 추가된 CloseAppBar입니다.',
    },
  },
};

export const withActionButton = Template.bind({});
withActionButton.args = {
  ...Default.args,
  children: <ActionButton>등록</ActionButton>,
};
withActionButton.parameters = {
  docs: {
    description: {
      story: '닫기 버튼 옆에 ActionButton 컴포넌트가 추가된 CloseAppBar입니다.',
    },
  },
};
