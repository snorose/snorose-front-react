import { useState } from 'react';
import { useCommentContext } from '../../../contexts/CommentContext.jsx';
import useComment from '../../../hooks/useComment.jsx';

import { DeleteModal, OptionModal } from '../../../components/Modal';
import { Icon } from '../../../components/Icon';
import { NestedComment } from '../';

import timeAgo from '../../../utils/timeAgo.js';

import styles from './Comment.module.css';

export default function Comment({ data }) {
  const { setIsEdit, commentId, setCommentId, setContent, inputFocus } =
    useCommentContext();
  const { deleteComment } = useComment();
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const onCommentOptionClick = ({ id, parentId, content }) => {
    setCommentId(id);
    setContent(content);
    setIsOptionModalOpen(true);
  };

  const onCloseClick = () => {
    setCommentId(undefined);
    setContent('');
  };

  const handleReply = (e) => {
    e.stopPropagation();
    setCommentId(data.id);
    inputFocus();
  };

  // const handleLikedClick = () => {
  //   console.log('API로 liked 데이터 수정');
  // };
  // >>>>>>> dev

  return (
    <>
      <div className={styles.comment} onClick={() => setCommentId(undefined)}>
        <div className={styles.commentTop}>
          <div className={styles.commentTopLeft}>
            <div className={styles.cloud}>
              <Icon id='cloud' width='19' height='13' />
            </div>
            <p>{data.userDisplay}</p>
            <p className={styles.dot}>·</p>
            <p>
              {timeAgo(data.createdAt)} {data.isUpdated ? ' (수정됨)' : null}
            </p>
          </div>
          <p
            className={styles.dot3}
            onClick={(e) => {
              e.stopPropagation();
              onCommentOptionClick(data);
            }}
          >
            {data.isWriter && (
              <Icon id='ellipsis-vertical' width='3' height='11' />
            )}
          </p>
        </div>
        <div className={styles.commentCenter}>{data.content}</div>
        <div className={styles.commentBottom}>
          <button className={styles.commentCount} onClick={handleReply}>
            <Icon id='comment' width='15' height='13' fill='#D9D9D9' />
            <p>{data.children.length}</p>
          </button>
          <button className={styles.likedCount}>
            <Icon id='like' width='13' height='12' fill='#D9D9D9' />
            <p>{data.likeCount}</p>
          </button>
        </div>
        {data.children.length > 0 &&
          data.children.map((childComment, index) => (
            <NestedComment
              key={childComment.id}
              data={childComment}
              isLast={index === data.children.length - 1}
              isFirst={index === 0}
              onCommentOptionClick={onCommentOptionClick}
            />
          ))}
      </div>
      <OptionModal
        id='comment-edit'
        isOpen={isOptionModalOpen}
        setIsOpen={setIsOptionModalOpen}
        closeFn={onCloseClick}
        functions={{
          pencil: () => {
            setIsOptionModalOpen(false);
            setIsEdit(true);
            inputFocus();
          },
          trash: () => {
            setIsDeleteModalOpen(true);
            setIsOptionModalOpen(false);
          },
        }}
      />
      <DeleteModal
        id='comment-delete'
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        redBtnFunction={() => {
          deleteComment.mutate({ commentId });
          setCommentId(undefined);
          setContent('');
        }}
      />
    </>
  );
}
