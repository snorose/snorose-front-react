import PopUp from './PopUp';

const meta = {
  component: PopUp,
  parameters: {
    docs: {
      description: {
        component:
          'PopUp 컴포넌트는 모달 형태의 팝업을 제공하는 UI 컴포넌트입니다.\n\n' +
          '**내부 구조**\n' +
          '- `Heading`: 팝업의 제목을 표시하는 컴포넌트\n' +
          '- `SubHeading`: 서브 타이틀을 표시하는 컴포넌트\n' +
          '- `Content`: 본문 내용을 표시하는 컴포넌트\n\n' +
          '**주의 사항**\n' +
          '- PopUp의 최상위 container는 `width: 100%`, `height: 100%`로 설정되어 있습니다.\n' +
          '- 따라서, PopUp이 포함된 부모 컴포넌트에서 적절한 크기를 지정해야 올바르게 표시됩니다.\n' +
          '- 예시: Storybook에서는 `<div style={{ height: "1000px" }}>`로 감싸서 사용합니다.',
      },
    },
  },
};

export default meta;

const Template = (args) => (
  <div style={{ height: '1000px' }}>
    <PopUp {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
