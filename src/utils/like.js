export const updateLikeIfTargetComment = ({
  comment,
  commentId,
  isLiked,
  likeCount,
}) => {
  if (comment.id === commentId) {
    return { ...comment, isLiked, likeCount };
  }

  if (comment.children.length > 0) {
    return {
      ...comment,
      children: comment.children.map((comment) =>
        updateLikeIfTargetComment({ comment, commentId, isLiked, likeCount })
      ),
    };
  }

  return comment;
};
