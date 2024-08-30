let timer;

export const debounce = (callback, delay) => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    callback();
  }, delay);
};
