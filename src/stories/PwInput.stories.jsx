import { useState } from 'react';
import { PwInput } from '@/shared/component';

const meta = {
  title: 'Component/PwInput',
  component: PwInput,
  parameters: {
    docs: {
      description: {
        component:
          '**PwInput 컴포넌트**는 비밀번호 입력을 위한 커스텀 컴포넌트로.<br />' +
          '입력값에 따라 색상이 동적으로 변경되며, 아이콘 클릭 시 비밀번호 표시/숨김 토글이 가능합니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '입력창 위에 표시할 제목',
    },
    placeholder: {
      control: 'text',
      description: 'input 태그의 placeholder 값',
    },
    value: {
      control: false,
      description: '입력값 상태 (스토리 내부에서 제어됨)',
    },
    onChange: {
      table: { disable: true },
    },
    errorMessage: {
      control: 'text',
      description:
        '에러 메시지를 전달하면 에러 상태로 렌더링되며, 메시지가 아래 표시됩니다.',
    },
    isStatic: {
      control: 'boolean',
      description:
        '상태에 따라 색상 변화 없이 고정된 회색 배경으로 유지할지 여부',
    },
  },
};

export default meta;

const Template = (args) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <PwInput
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  title: '비밀번호',
  placeholder: '비밀번호를 입력하세요',
  value: '',
  errorMessage: '',
  isStatic: false,
};

export const WithError = Template.bind({});
WithError.args = {
  title: '비밀번호',
  placeholder: '비밀번호를 입력하세요',
  value: '12',
  errorMessage: '8자 이상 입력해주세요.',
  isStatic: false,
};

export const Success = Template.bind({});
Success.args = {
  title: '비밀번호',
  placeholder: '비밀번호를 입력하세요',
  value: '12345678',
  errorMessage: '',
  isStatic: false,
};

export const StaticInput = Template.bind({});
StaticInput.args = {
  title: '비밀번호',
  placeholder: '비밀번호를 입력하세요',
  value: '1234',
  errorMessage: '',
  isStatic: true,
};
