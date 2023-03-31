export const showTag = (element) => {
  if (!element.classList.contains('show-tag')) {
    element.classList.add('show-tag');
  }
};

export const hideTag = (element) => {
  if (element.classList.contains('show-tag')) {
    element.classList.remove('show-tag');
  }
};
