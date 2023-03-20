import domElements from '../domElements.js';

const addTagInInputSecondary = (e) => {
  domElements.inputSecondaryAllItems.forEach((inputSecondaryItems) =>
    inputSecondaryItems.childNodes.forEach((item) => {
      if (item.textContent === e.target.parentNode.textContent) {
        item.classList.add('show');
      }
    })
  );
};

const deleteTagFromTags = (e) => {
  if (e.target.className === 'tag-img') {
    e.target.parentNode.remove();
  }
};

const createTaginTags = (e) => {
  const text = e.target.textContent;
  const tagClass = e.target.parentNode.parentNode.classList[1];

  const div = document.createElement('div');
  div.className = 'tag';
  div.classList.add(tagClass);

  const h3 = document.createElement('h3');
  h3.textContent = text;
  h3.className = 'tag-title';

  const img = document.createElement('img');
  img.className = 'tag-img';
  img.src = '/assets/images/icons/delete.svg';
  img.alt = 'delete';

  div.appendChild(h3);
  div.appendChild(img);

  domElements.tags.appendChild(div);
};

const deleteTagFromInputSecondary = (e) => {
  e.target.classList.remove('show');
};

export const clickOnTags = (e) => {
  addTagInInputSecondary(e);
  deleteTagFromTags(e);
};

export const clickOnInputSecondary = (e) => {
  deleteTagFromInputSecondary(e);
  createTaginTags(e);
};

export const clickSecondaryElementsArrow = (e) => {
  const thisInput = e.target.previousElementSibling.classList[1];

  domElements.inputSecondary.forEach((input) => {
    const { lastElementChild: inputLEC } = input;
    const icon = input.firstElementChild.lastElementChild;
    const inputClassList = input.classList;
    if (
      inputClassList.contains(thisInput) &&
      !inputClassList.contains('input-secondary-open')
    ) {
      inputClassList.add('input-secondary-open');
      inputLEC.classList.add('show');
      icon.style.transform = 'rotate(180deg)';
    } else {
      inputClassList.remove('input-secondary-open');
      inputLEC.classList.remove('show');

      icon.style.transform = 'rotate(0deg)';
    }
  });
};
