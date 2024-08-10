import { useParams } from 'react-router-dom';

export default function ExamReviewDetailPage() {
  const { postId } = useParams();

  console.log(postId);

  return <div>postId: {postId}에 대한 리뷰입니다.</div>;
}
