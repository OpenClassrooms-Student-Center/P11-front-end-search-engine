import domElements from '../domElements.js';

function getInputSecondaryElements(e) {
  const thisInput = e.target.previousElementSibling.classList[1];
  const inputElement = Array.from(domElements.inputSecondaryIcon).find((node) =>
    node.parentElement.parentElement.classList.contains(thisInput)
  ).parentElement.parentElement;
  const icon = inputElement.firstElementChild.lastElementChild;

  if (domElements.inputSecondaryAllItems.style.display === 'flex') {
    domElements.inputSecondary.classList.remove('input-secondary-open');
    domElements.inputSecondaryAllItems.style.display = 'none';
    icon.style.transform = 'rotate(0deg)';
  } else {
    domElements.inputSecondary.classList.add('input-secondary-open');
    domElements.inputSecondaryAllItems.style.display = 'flex';
    icon.style.transform = 'rotate(180deg)';
  }
}

export default getInputSecondaryElements;
