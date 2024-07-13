import styles from './PostPage.module.css';
import Icon from '../../../components/Icon/Icon.jsx';
import Comment from '../../../components/Commnet/Comment.jsx';
import NestedComment from '../../../components/Commnet/NestedComment.jsx';
import InputBar from '../../../components/InputBar/InputBar.jsx';

export default function PostPage() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.header}>
          <div className={styles.side_menu_btn}>
            <Icon id='arrow-back' />
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.profile_icon}>
            <Icon id='profile' />
          </div>
          <p className={styles.name}>이름</p>
          <div className={styles.more_option}>
            <Icon id='more-option' />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>우당탕탕 오이소박이 만들기</h1>
        <p className={styles.text}>
          내가 먹고싶다고하니까 엄마가 오이 1박스를 시켜서ㅋㅋㅋㅋ본가 온 김에
          엄마랑 이 시간까지 김장했으~ 오이 23개를 잘 씻어준다 1박스는
          20개였는데 집에있던 3개 추가 오이를 4등분 한 후에 칼집을 내준다 이거
          혼자 다함 대박 힘들어 양념소를 만든다 고춧가루 새우젓 생강 다진마늘
          양파 당근 부추 등등 사실 기억 다 못함 김장 생각보다 빨리 끝남 완성!
          너무너무너무 맛있음... 근데 손에 오이물들어서... 잘 안빠지는 중...^^
        </p>
        <p className={styles.edited}>2시간 전에 수정됨</p>
        <div className={styles.post_bottom}>
          <div className={styles.comment_icon}>
            <Icon id='comment' />
          </div>
          <p className={styles.comment_cnt}>3</p>
          <div className={styles.like_icon}>
            <Icon id='blank-heart' />
          </div>
          <p className={styles.like_cnt}>5</p>
          <p className={styles.view_cnt}>1385 조회</p>
        </div>
      </div>
      <Comment />
      <NestedComment />
      <InputBar />
    </div>
  );
}
