// 댓글과 대댓글을 재귀적으로 필터링하는 함수
export const filterDeletedComments = (comments) => {
  return comments
    ?.filter(({ isDeleted }) => !isDeleted)
    .map((comment) => ({
      ...comment,
      children: filterDeletedComments(comment.children),
    }));
};
