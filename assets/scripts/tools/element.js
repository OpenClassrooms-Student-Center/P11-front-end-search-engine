export const showElement = (element) => {
  if (!element.classList.contains('show')) {
    element.classList.add('show');
  }
};

export const hideElement = (element) => {
  if (element.classList.contains('show')) {
    element.classList.remove('show');
  }
};
