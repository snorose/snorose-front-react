const urlRegex = /(https?:\/\/[^\s]+)/g;

export const convertHyperlink = (text) => {
  const convertedText = text.replace(
    urlRegex,
    (url) =>
      `<a href=${url} target='_blank' rel='noopener noreferrer'>${url}</a>`
  );

  return { __html: convertedText };
};
