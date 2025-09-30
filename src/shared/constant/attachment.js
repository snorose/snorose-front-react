//이미지*영상 개수 및 용량 제한 정책
export const ATTACHMENT_SIZE_LIMIT = Object.freeze({
  imageFileSize: 5 * 1024 * 1024, //MB
  imageQuantity: 10,
  videoFileSize: 50 * 1024 * 1024,
  videoQuantity: 1,
});
