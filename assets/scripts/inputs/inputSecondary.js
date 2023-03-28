import domElements from '../domElements.js';
import { updateTags } from '../tags/updateTags.js';

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

const inputSecondary = (e) => {
  const { value: inputValue } = e.target;
  const inputName = e.target.attributes.list.value;

  if (inputValue !== '') {
    openCloseInputSecondary(inputName, inputValue);
  }
  updateTags();
};

export default inputSecondary;
