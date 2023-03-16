import domElements from '../domElements.js';

export const clickOnFields = (e) => {
  const addFieldInInputSecondary = () => {
    domElements.inputSecondaryAllItems.forEach((inputSecondaryItems) =>
      inputSecondaryItems.childNodes.forEach((item) => {
        if (item.textContent === e.target.parentNode.textContent) {
          item.classList.add('show');
        }
      })
    );
  };

  const deleteFieldFromFields = () => {
    if (e.target.className === 'field-img') {
      e.target.parentNode.remove();
    }
  };

  addFieldInInputSecondary();
  deleteFieldFromFields();
};

export const clickOnInputSecondary = (e) => {
  const createField = () => {
    const text = e.target.textContent;
    const fieldClass = e.target.parentNode.parentNode.classList[1];

    const div = document.createElement('div');
    div.className = 'field';
    div.classList.add(fieldClass);

    const h3 = document.createElement('h3');
    h3.textContent = text;
    h3.className = 'field-title';

    const img = document.createElement('img');
    img.className = 'field-img';
    img.src = '/assets/images/icons/delete.svg';
    img.alt = 'delete';

    div.appendChild(h3);
    div.appendChild(img);

    domElements.fields.appendChild(div);
  };

  e.target.classList.remove('show');

  createField();
};

export const clickSecondaryElementsArrow = (e) => {
  const thisInput = e.target.previousElementSibling.classList[1];

  domElements.inputSecondary.forEach((input) => {
    const { lastElementChild: inputLEC } = input;
    const icon = input.firstElementChild.lastElementChild;
    const inputClassList = input.classList;
    const inputStyle = input.style;

    if (
      inputClassList.contains(thisInput) &&
      !inputLEC.classList.contains('show')
    ) {
      inputStyle.animationName = 'append-animate-inputs-secondary';
      setTimeout(() => {
        inputClassList.add('input-secondary-open');
        inputLEC.classList.add('show');
      }, 270);
      icon.style.transform = 'rotate(180deg)';
    } else {
      inputStyle.animationName = 'disappear-animate-inputs-secondary';
      setTimeout(() => {
        inputClassList.remove('input-secondary-open');
      }, 300);
      inputLEC.classList.remove('show');
      icon.style.transform = 'rotate(0deg)';
    }
  });
};
