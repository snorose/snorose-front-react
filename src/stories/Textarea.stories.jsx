import { useState } from 'react';
import { Textarea } from '@/shared/component';

const meta = {
  title: 'Component/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `
**Textarea 컴포넌트**는 \`react-textarea-autosize\`를 기반으로 한 자동 높이 조절 입력 필드입니다.  
사용자의 입력에 따라 줄 수가 자동으로 늘어나며, \`minRows\` 및 \`maxRows\`로 최소/최대 높이를 제한할 수 있습니다.  
\`setFn\`을 통해 외부 상태와 연동되며, 기본적으로 스타일이 적용되어 있습니다.
        `.trim(),
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description: '입력 필드의 값 (스토리 내부에서 제어됨)',
      type: { name: 'string' },
    },
    setFn: {
      table: { disable: true },
    },
    placeholder: {
      control: 'text',
      description: '입력창에 표시될 placeholder 텍스트',
      type: { name: 'string' },
    },
    minRows: {
      control: 'number',
      description: '최소 표시 줄 수',
      type: { name: 'number' },
    },
    maxRows: {
      control: 'number',
      description: '최대 표시 줄 수',
      type: { name: 'number' },
    },
  },
};

export default meta;

const Template = (args) => {
  const [text, setText] = useState(args.value || '');

  return <Textarea {...args} value={text} setFn={setText} />;
};

export const Default = Template.bind({});
Default.args = {
  value: '',
  placeholder: '내용을 입력하세요',
  minRows: 3,
  maxRows: 8,
};
