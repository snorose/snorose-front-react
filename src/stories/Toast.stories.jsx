import Toast from '@/shared/component/Toast/Toast';
import { v4 as uuidv4 } from 'uuid';

const toastStoryConfig = {
  title: 'Component/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component:
          'Toast 컴포넌트는 토스트를 띄워주는 컴포넌트입니다.\n\n' +
          'createPortal을 통해서 toast id를 가진 DOM에게 토스트를 갖다붙여줍니다.\n\n' +
          '토스트에 어떤 메세지를 보일 것이지 정할 수 있으며, 토스트의 추가 기능들 (점차 사라지는 애니메이션 담당 함수, 토스트 메세지 없애기 함수 - ToastContext에서 가져 옴)도 저장해 두고 있습니다.\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `ToastContext.jsx`: 토스트로 띄워야 할 메세지들을 addToast와 removeToast를 사용해서 toast라는 state에 저장해줍니다. 그러고 난 후 toast안의 메세지들을 map을 통해 여러 Toast 컴포넌트들을 동시에 띄워줍니다. (그래서 여러 토스트가 올라가야한다면 동시에 나타납니다.)\n\n * createContext를 이용해서 propsdrilling 없이 자식인 Toast 컴포넌트가 addToast와 removeToast를 사용할 수 있게 합니다.',
      },
    },
  },
  args: {
    toast: { id: uuidv4(), message: '토스트 속 메세지' },
  },
  argTypes: {
    toast: {
      description:
        'id와 message로 구성이 된 object입니다.\n\n' +
        'id는 여러 토스트들을 구분하기 위해 uuidv4()로 생성한 string이고, message는 토스트에 담을 글인 string입니다.\n\n',
      table: {
        type: {
          summary: 'object',
        },
      },
      control: { type: 'object' },
    },
  },
};
export default toastStoryConfig;

const Template = (args) => {
  if (!document.getElementById('toast')) {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast';
    document.body.appendChild(toastContainer);
  }
  return (
    <div id='toast'>
      <Toast {...args} />
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {};
