import domElements from '../domElements.js';

function clickSecondaryElementsArrow(e) {
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
}

export default clickSecondaryElementsArrow;
