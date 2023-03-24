import domElements from '../domElements.js';
import { hideElement, showElement } from '../tools/element.js';

const openCloseInputSecondary = (inputName, inputValue) => {
  domElements.inputSecondary.forEach((input) => {
    const { lastElementChild: inputLEC } = input;
    const icon = input.firstElementChild.lastElementChild;
    const inputClassList = input.classList;
    if (
      inputClassList.contains(inputName) &&
      !inputClassList.contains('input-secondary-open')
    ) {
      inputClassList.add('input-secondary-open');
      inputLEC.classList.add('show');
      icon.style.transform = 'rotate(180deg)';
    } else if (inputValue === '') {
      inputClassList.remove('input-secondary-open');
      inputLEC.classList.remove('show');
      icon.style.transform = 'rotate(0deg)';
    }
  });
};

const showHideItemInInputSecondary = (childNodes, inputValue) => {
  childNodes.forEach((child, index) => {
    if (!child.value.toLowerCase().includes(inputValue.toLowerCase())) {
      hideElement(child);
      return;
    }
    if (!child.classList.contains('show') && index < 30) {
      showElement(child);
    }
  });
};

const inputSecondary = (e) => {
  const { childNodes } = e.target.parentNode.parentNode.lastElementChild;
  const { value: inputValue } = e.target;
  const inputName = e.target.attributes.list.value;

  if (inputValue !== '') {
    openCloseInputSecondary(inputName, inputValue);
  }

  showHideItemInInputSecondary(childNodes, inputValue);
};

export default inputSecondary;
