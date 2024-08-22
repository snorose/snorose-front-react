// import { useParams } from 'react-router-dom';
// import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

// import {
//   getPostList,
//   getPostContent,
//   postPost as post,
//   patchPost as edit,
//   deletePost as remove,
// } from '../apis/post.js';

// export default function usePost() {
//   const queryClient = useQueryClient();

//   // 게시글 리스트 가져오기
//   const { data: gerPostList, error: postListError } = useQuery({
//     queryKey: ['posts', boardId],
//     queryFn: () => getPostList({ boardId }),
//     staleTime: 1000 * 60, // 1 minute
//   });

//   // 게시글 상세 조회
//   const { data: gerPostContent, error: gerPostContentError } = useQuery({
//     queryKey: ['post', boardId, postId],
//     queryFn: () => getPostContent({ boardId, postId }),
//     enabled: !!boardId && !!postId, // boardId와 postId가 모두 있어야 API 호출
//     staleTime: 1000 * 60,
//   });

//   // 게시글 등록
//   const postPost = useMutation({
//     mutationFn: ({ category, title, content, isNotice }) =>
//       post({ category, boardId, title, content, isNotice }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['posts', boardId]);
//     },
//     onError: (error) => {
//       const errorStatus = error.response?.status;
//       if (errorStatus === 400) {
//         alert('게시글 등록에 실패했습니다.');
//       } else if (errorStatus === 404) {
//         alert('게시글을 찾을 수 없습니다.');
//       }
//     },
//   });

//   // 게시글 삭제
//   const deletePost = useMutation({
//     mutationFn: ({ postId }) => remove({ boardId, postId }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['posts', boardId]);
//     },
//     onError: (error) => {
//       const errorStatus = error.response?.status;
//       if (errorStatus === 400) {
//         alert('게시글 삭제에 실패했습니다.');
//       } else if (errorStatus === 404) {
//         alert('찾을 수 없는 게시글입니다.');
//       }
//     },
//   });

//   // 게시글 수정
//   const editPost = useMutation({
//     mutationFn: ({ postId, title, content }) =>
//       edit({ boardId, postId, title, content }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(['posts', boardId]);
//     },
//     onError: (error) => {
//       const errorStatus = error.response?.status;
//       if (errorStatus === 400) {
//         alert('게시글 수정에 실패했습니다.');
//       } else if (errorStatus === 404) {
//         alert('게시글을 찾을 수 없습니다.');
//       }
//     },
//   });

//   return {
//     gerPostList,
//     getPostContent,
//     postPost,
//     deletePost,
//     editPost,
//   };
// }
