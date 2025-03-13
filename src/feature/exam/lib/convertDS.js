// dropDown.js에 있는 배열을 객체로 변환하는 함수

export const convertToObject = (array) => {
  return array.reduce(
    (result, { id, name }) => ({ ...result, [id]: name }),
    {}
  );
};
