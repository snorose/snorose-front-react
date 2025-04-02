import {
  Accordion,
  AccordionListItem,
  AccordionTag,
} from '@/feature/home/component';

import { ABOUT_SNOROSE, SNOROSE_HISTORY } from '@/feature/home/constant';

const meta = {
  title: 'Component/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          'Accordion 컴포넌트는 클릭하면 내용을 확장 및 축소할 수 있는 인터랙티브 UI입니다.\n\n' +
          '기본적으로 텍스트, 리스트, 태그 등 다양한 내용을 포함할 수 있으며, 스타일링이 적용되지 않은 기본형과 부모 컨테이너에 스타일이 적용된 형태로 사용할 수 있습니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '컴포넌트 헤더 부분의 제목 설정',
    },
  },
};

export default meta;

const Template = (args) => <Accordion {...args} />;

const StyledTemplate = (args) => (
  <div
    style={{
      padding: '0 1.4rem',
      backgroundColor: 'var(--blue-0)',
      borderRadius: '0.5rem',
    }}
  >
    <Accordion {...args} />
  </div>
);

export const WithoutStyledContainer = Template.bind({});
WithoutStyledContainer.args = {
  title: '기본 아코디언 (스타일 없음)',
  children: <p>기본 아코디언입니다.</p>,
};

export const WithStyledContainer = StyledTemplate.bind({});
WithStyledContainer.args = {
  title: '부모 컨테이너에 스타일이 적용된 아코디언',
  children: <p>부모 컨테이너에 스타일이 적용된 아코디언입니다.</p>,
};

export const WithAccordionListItems = StyledTemplate.bind({});
WithAccordionListItems.args = {
  title: '스노로즈 연혁',
  children: <AccordionListItem list={SNOROSE_HISTORY} />,
};

export const WithAccordionTag = StyledTemplate.bind({});
WithAccordionTag.args = {
  title: '명예의 전당',
  children: (
    <AccordionTag
      admin={{
        nickname: '눈송이 닉네임',
        role: '회장',
        team: ['개발팀'],
        position: ['FE'],
        studentInformation: '전공 학번 눈송이',
      }}
    />
  ),
};

export const WithHTMLTag = StyledTemplate.bind({});
WithHTMLTag.args = {
  title: '스노로즈 소개',
  children: <pre>{ABOUT_SNOROSE}</pre>,
};
