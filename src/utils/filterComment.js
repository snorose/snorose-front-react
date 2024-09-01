export const filterVisibleComments = (comments) => {
  return comments?.reduce((filtered, comment) => {
    if (comment.children && comment.children.length > 0) {
      const filteredChildren = filterVisibleComments(comment.children);

      if (
        filteredChildren.length > 0 ||
        (!comment.isDeleted && comment.isVisible)
      ) {
        filtered.push({
          ...comment,
          children: filteredChildren,
        });
      }
    } else {
      if (!comment.isDeleted && comment.isVisible) {
        filtered.push(comment);
      }
    }
    return filtered;
  }, []);
};
