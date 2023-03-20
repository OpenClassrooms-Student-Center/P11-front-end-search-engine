import domElements from '../domElements.js';

const inputSecondary = (e) => {
  const { childNodes } = e.target.parentNode.parentNode.lastElementChild;
  const { value } = e.target;

  const thisInput = e.target.attributes.list.value;

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
    } else if (value === '') {
      inputClassList.remove('input-secondary-open');
      inputLEC.classList.remove('show');
      icon.style.transform = 'rotate(0deg)';
    }
  });

  childNodes.forEach((child, index) => {
    const tempChild = child;
    if (!child.value.toLowerCase().includes(value.toLowerCase())) {
      tempChild.classList.remove('show');
      return;
    }
    if (!tempChild.classList.contains('show') && index < 30) {
      tempChild.classList.add('show');
    }
  });
};

export default inputSecondary;
