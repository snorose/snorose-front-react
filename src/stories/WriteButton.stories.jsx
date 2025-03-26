import WriteButton from '@/shared/component/button/WriteButton/WriteButton';
import styles from '@/page/board/NoticeListPage/NoticeListPage.module.css';

const writeButtonStoryConfig = {
  component: WriteButton,
  parameters: {
    docs: {
      description: {
        component:
          'WriteButton 컴포넌트는 게시판 우측 하단에 위치된 컴포넌트로, 누르면 해당 게시판의 글을 쓰는 페이지가 띄워집니다.\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `ExamReviewsPage.jsx`\n\n' +
          '- `NoticeListPage.jsx`\n\n' +
          '- `PostsPage.jsx`\n\n',
      },
    },
  },
  args: {
    to: `/board/exam-review-write`,
    className: styles.writeButton,
  },
  argTypes: {
    to: {
      description:
        '해당 컴포넌트를 누를 시 이동할 주소입니다.\n\n' +
        "ex) ExamReviewsPage.jsx에서는 '/board/exam-review-write'을 전달했습니다.",
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    className: {
      description: '추가적인 스타일입니다.\n\n',
      table: {
        type: {
          summary: 'CSS',
        },
      },
      control: {
        type: null,
      },
    },
  },
};
export default writeButtonStoryConfig;

const Template = (args) => (
  <div style={{ width: '100%', height: '10vh', padding: '20px' }}>
    <WriteButton {...args} />
  </div>
);
export const Default = Template.bind({});
Default.args = {};
