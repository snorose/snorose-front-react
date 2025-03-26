import ReviewDownload from '@/feature/exam/component/ReviewDownload/ReviewDownload';
import styles from '@/page/exam/ExamReviewPage/ExamReviewPage.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constant';
import { getReviewDetail } from '@/apis';

const ReviewDownloadWrapper = (props) => {
  const { postId } = useParams(); // useParams inside component
  const { data } = useQuery({
    queryKey: [QUERY_KEY.post, postId],
    queryFn: () => getReviewDetail(postId),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <ReviewDownload
      {...props}
      className={styles.fileDownload}
      fileName={data?.fileName || 'Mock File Name'}
      isDownloaded={true}
      isWriter={true}
    />
  );
};

const reviewDownloadStoryConfig = {
  component: ReviewDownloadWrapper,
  parameters: {
    docs: {
      description: {
        component:
          'ReviewContentItem 컴포넌트는 누르면 ExamReviewpage에서 족보 파일을 다운로드 받을 수 있습니다.\n\n' +
          '**참고를 위해 쓰이는 파일 목록**\n' +
          '- `ExamReviewPage.jsx`:  족보 관련 정보들이 담겨져 있고, ReviewDownload 컴포넌트를 사용해 족보를 다운받을 수 있게 하는 페이지입니다. \n',
      },
    },
  },
  args: {
    className: styles.fileDownload,
    fileName: 'Mock File Name',
    isDownloaded: true,
    isWriter: true,
  },
  argTypes: {
    className: {
      description: 'ReveiwDownload에게 추가적으로 적용할 스타일입니다.\n\n',
      table: {
        type: {
          summary: 'CSS',
        },
      },
      control: { type: 'CSS' },
    },
    fileName: {
      description: '다운로드 받는 족보 파일의 이름입니다.\n\n',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: 'text',
      },
    },
    isDownloaded: {
      description: '이미 다운로드 받은 족보인지 알려줍니다. \n\n' + '\n\n',
      table: {
        type: {
          summary: 'boolean',
        },
      },
      control: {
        type: 'boolean',
      },
    },
    isWriter: {
      description: '유저가 족보 작성자인지 알려줍니다. \n\n' + '\n\n',
      table: {
        type: {
          summary: 'boolean',
        },
      },
      control: {
        type: 'boolean',
      },
    },
  },
};
export default reviewDownloadStoryConfig;

const Template = (args) => <ReviewDownload {...args} />;
export const Default = Template.bind({});
Default.args = {};
