import { useState } from 'react';
import { SpecialInput } from '@/shared/component';

const meta = {
  title: 'Component/SpecialInput',
  component: SpecialInput,
  parameters: {
    docs: {
      description: {
        component: `
**SpecialInput 컴포넌트**는 내부에 \`Input\` 컴포넌트를 포함하며,  
입력 상태에 따라 배경색이 바뀌고, 아이콘을 클릭하면 \`input type\`이 전환되는 커스텀 입력 필드입니다.
        `.trim(),
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '입력 필드 위에 표시할 제목',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
    },
    id1: {
      control: 'text',
      description: '기본 상태의 아이콘 ID (예: "opened-eye")',
    },
    id2: {
      control: 'text',
      description: '클릭 후 변경될 아이콘 ID (예: "closed-eye")',
    },
    color1: {
      control: 'color',
      description: 'ready 상태일 때 아이콘 색상',
    },
    color2: {
      control: 'color',
      description: 'right 상태일 때 아이콘 색상',
    },
    color3: {
      control: 'color',
      description: 'wrong 상태일 때 아이콘 색상',
    },
    state1: {
      control: 'text',
      description: '아이콘 클릭 전 input type (예: "password")',
    },
    state2: {
      control: 'text',
      description: '아이콘 클릭 후 input type (예: "text")',
    },
    errMsg: {
      control: 'text',
      description: '에러 메시지 (wrong 상태일 때 표시)',
    },
  },
};

export default meta;

const Template = (args) => {
  const [data, setData] = useState({
    [args.inputType]: args.defaultValue || '',
  });
  const [className, setClassName] = useState('ready');

  const validate = (value) => {
    if (!value) return 'ready';
    if (value.length < 3) return 'wrong';
    return 'right';
  };

  return (
    <SpecialInput
      {...args}
      data={data}
      inputData={setData}
      className={className}
      setClassName={setClassName}
      classNameCheck={validate}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  title: '비밀번호',
  placeholder: '비밀번호를 입력하세요',
  inputType: 'password',
  id1: 'opened-eye',
  id2: 'closed-eye',
  color1: '#999999',
  color2: '#00368e',
  color3: '#ff4b6c',
  state1: 'password',
  state2: 'text',
  errMsg: '3자 이상 입력해주세요.',
  defaultValue: '',
};
