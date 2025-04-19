import { Calendar } from '@/feature/attendance/component';

const meta = {
  title: 'Component/Calendar',
  component: Calendar,
  parameters: {
    docs: {
      description: {
        component:
          'Calendar 컴포넌트는 월별 출석 데이터를 표시하는 캘린더 UI입니다. \n\n' +
          '날짜 변경 시 callback을 통해 데이터를 가져오며, React Query를 사용하여 월별 출석 정보를 불러옵니다.',
      },
    },
  },
  argTypes: {
    callback: {
      action: 'callback triggered',
      description: '날짜가 변경될 때 실행되는 콜백 함수',
    },
  },
};

export default meta;

const Template = (args) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--blue-4)',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Calendar {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
