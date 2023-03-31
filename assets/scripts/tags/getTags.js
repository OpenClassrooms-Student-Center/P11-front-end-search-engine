import domElements from '../domElements.js';

const getTags = () => {
  const tags = [];
  domElements.tags.childNodes.forEach((child) => {
    tags.push({ item: child.classList[1], name: child.textContent });
  });
  return tags;
};

export default getTags;
