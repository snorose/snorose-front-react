export const updateLikeIfTargetComment = ({
  comment,
  targetId,
  isLiked,
  likeCount,
}) => {
  if (comment.id === targetId) {
    return { ...comment, isLiked, likeCount };
  }

  if (comment.children.length > 0) {
    return {
      ...comment,
      children: comment.children.map((comment) =>
        updateLikeIfTargetComment({ comment, targetId, isLiked, likeCount })
      ),
    };
  }

  return comment;
};

export const deleteIfTargetComment = ({ comment, targetId }) => {
  if (comment.id === targetId) {
    return { ...comment, isDeleted: true };
  }

  if (comment.children.length > 0) {
    return {
      ...comment,
      children: comment.children.map((comment) =>
        deleteIfTargetComment({ comment, targetId })
      ),
    };
  }

  return comment;
};

export const editIfTargetComment = ({ comment, targetId, content }) => {
  if (comment.id === targetId) {
    return { ...comment, content, isUpdated: true };
  }

  if (comment.children.length > 0) {
    return {
      ...comment,
      children: comment.children.map((comment) =>
        editIfTargetComment({ comment, targetId, content })
      ),
    };
  }

  return comment;
};
