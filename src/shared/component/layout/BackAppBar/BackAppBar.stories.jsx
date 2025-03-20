import BackAppBar from '@/shared/component';
import Search from '@/feature/search/component';

const meta = {
  component: 'AppBar/BackAppBar',
  parameters: {
    docs: {
      description: {
        component:
          'BackAppBar 컴포넌트는 뒤로 가기 기능을 포함한 네비게이션 바입니다. 검색 및 메뉴 버튼을 옵션으로 추가할 수 있습니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '앱 바의 제목 설정',
    },
    hasMenu: {
      control: 'boolean',
      description: '메뉴 아이콘 표시 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasSearch: {
      control: 'boolean',
      description: '검색 아이콘 표시 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    hasSearchInput: {
      control: 'boolean',
      description: '검색 입력 필드 포함 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    isDark: {
      control: 'boolean',
      description: '다크 모드 스타일 적용 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    notFixed: {
      control: 'boolean',
      description: '앱 바의 위치를 고정할지 여부',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    backNavTo: {
      control: 'text',
      description: '뒤로 가기 버튼 클릭 시 이동할 경로',
    },
    backgroundColor: {
      control: 'color',
      description: '앱 바의 배경 색상',
    },
  },
};

export default meta;

const Template = (args) => <BackAppBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '기본 앱 바',
};
Default.parameters = {
  docs: {
    description: {
      story: '기본적인 BackAppBar로, 뒤로 가기 버튼과 제목을 포함합니다.',
    },
  },
};

export const WithSearchButton = Template.bind({});
WithSearchButton.args = {
  title: '검색 가능 앱 바',
  hasSearch: true,
};
WithSearchButton.parameters = {
  docs: {
    description: {
      story:
        '`hasSearch=true`일 때 검색 버튼이 나타나고, 클릭하면 `<Search placeholder="검색" />`이 표시됩니다.',
    },
  },
};

export const WithSearchInput = Template.bind({});
WithSearchInput.args = {
  hasSearchInput: true,
  children: <Search placeholder={'검색'} />,
};
WithSearchInput.parameters = {
  docs: {
    description: {
      story:
        '`hasSearch=true`일 때 검색 버튼이 나타나고, 클릭하면 `<Search placeholder="검색" />`이 표시됩니다.',
    },
  },
};

export const WithMenu = Template.bind({});
WithMenu.args = {
  title: '메뉴 포함',
  hasMenu: true,
};
WithMenu.parameters = {
  docs: {
    description: {
      story: '메뉴 버튼이 추가된 BackAppBar입니다.',
    },
  },
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  isDark: true,
  backgroundColor: 'var(--blue-4)',
};
DarkMode.parameters = {
  docs: {
    description: {
      story: '다크 모드 스타일이 적용된 BackAppBar입니다.',
    },
  },
};
