import domElements from '../domElements.js';
import { isItemInTags } from '../tags/updateTags.js';
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
  let numberOfElementShow = 0;
  childNodes.forEach((child) => {
    if (
      isItemInTags(child) &&
      child.value.toLowerCase().includes(inputValue.toLowerCase()) &&
      numberOfElementShow < 30
    ) {
      numberOfElementShow += 1;
      showElement(child);
      return;
    }
    hideElement(child);
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
