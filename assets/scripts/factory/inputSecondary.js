import domElements from '../domElements.js';
import getData from '../data/cleanData.js';

const { allIngredients, allAppliances, allUstensils } = getData();

function getItems(thisInput, inputLEC) {
  let array = [];
  if (thisInput === 'ingredients') {
    array = allIngredients;
  } else if (thisInput === 'appliances') {
    array = allAppliances;
  } else if (thisInput === 'ustensils') {
    array = allUstensils;
  }
  inputLEC.replaceChildren();
  array
    .sort((a, b) => a.recurrence < b.recurrence)
    .slice(0, 30)
    .forEach((item) => {
      const div = document.createElement('div');
      div.className = 'input-secondary-ingredient';
      div.textContent =
        item.item.substring(0, 1).toUpperCase() + item.item.substring(1);
      inputLEC.appendChild(div);
    });
}

function getInputSecondaryElements(e) {
  const thisInput = e.target.previousElementSibling.classList[1];

  domElements.inputSecondary.forEach((input) => {
    const { lastElementChild: inputLEC } = input;
    const icon = input.firstElementChild.lastElementChild;
    const inputClassList = input.classList;
    const inputStyle = input.style;

    if (
      inputClassList.contains(thisInput) &&
      input.lastElementChild.style.display !== 'flex'
    ) {
      inputStyle.animationName = 'append-animate';
      setTimeout(() => {
        inputClassList.add('input-secondary-open');
        inputLEC.style.display = 'flex';
      }, 300);
      icon.style.transform = 'rotate(180deg)';
      getItems(thisInput, inputLEC);
    } else {
      inputStyle.animationName = 'disappear-animate';
      setTimeout(() => {
        inputClassList.remove('input-secondary-open');
      }, 300);
      inputLEC.style.display = 'none';
      icon.style.transform = 'rotate(0deg)';
    }
  });
}

export default getInputSecondaryElements;
