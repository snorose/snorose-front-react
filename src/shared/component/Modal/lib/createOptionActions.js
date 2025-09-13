// IconOptionModal 신고 옵션 액션 생성기
// options 객체 안의 id를 이용해 setModal({ id: confirmId, type: uppercase(id) }) 형태로 액션 생성
export const createOptionActions = (setModal, options, confirmId) =>
  Object.fromEntries(
    options.map((option) => [
      option.id,
      () =>
        setModal({
          id: confirmId,
          type: option.id.toUpperCase().replace(/-/g, '_'),
        }),
    ])
  );
