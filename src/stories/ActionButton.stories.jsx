import { ActionButton, CloseAppBar, BackAppBar } from '@/shared/component';

const meta = {
  title: 'Component/ActionButton',
  component: ActionButton,
  parameters: {
    docs: {
      description: {
        component: `
**ActionButton**은 사용자의 주요 행동을 유도할 때 사용하는 버튼 컴포넌트입니다.  
일관된 스타일과 레이아웃을 유지하며, 다양한 컨텍스트(단독, AppBar 내부 등)에서 재사용 가능합니다.

### 주요 특징
- 기본 HTML \`<button>\` 요소를 기반으로 작동
- \`children\`으로 버튼 텍스트를 전달
- \`disabled\` 상태로 비활성화 가능
- 클릭 시 \`onClick\` 핸들러 실행

### 사용 예시
1. 페이지 하단 제출 버튼
2. 상단 AppBar 내부 '완료' 버튼
3. 닫기 AppBar 내부 '수정' 버튼 등
`,
      },
    },
  },
  argTypes: {
    onClick: { action: 'clicked' },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

const Template = (args) => <ActionButton {...args} />;

const WithBackAppBarTemplate = (args) => (
  <header style={{ display: 'flex', justifyContent: 'space-between' }}>
    <p>
      <BackAppBar notFixed />
    </p>
    <div
      style={{
        backgroundColor: 'transparent',
        padding: '0.875rem 1.25rem',
        fontSize: '1rem',
      }}
    >
      <ActionButton {...args} />
    </div>
  </header>
);

const WithCloseAppBarTemplate = (args) => (
  <CloseAppBar>
    <ActionButton {...args} />
  </CloseAppBar>
);

export const WithoutAppBar = Template.bind({});
WithoutAppBar.args = {
  children: '버튼',
  disabled: false,
};

export const InsideBackAppBar = WithBackAppBarTemplate.bind({});
InsideBackAppBar.args = {
  children: '완료',
  disabled: false,
};

export const InsideCloseAppBar = WithCloseAppBarTemplate.bind({});
InsideCloseAppBar.args = {
  children: '수정',
  disabled: false,
};
