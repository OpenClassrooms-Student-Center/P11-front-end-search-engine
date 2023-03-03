import domElements from '../domElements.js';
import clickSecondaryElementsArrow from '../actions/click.js';
import { showInputsSecondary, showRecipes } from '../data/showData.js';
import { inputMain } from '../actions/inputs.js';

domElements.inputSecondaryIcon.forEach((icon) =>
  icon.addEventListener('click', (e) => clickSecondaryElementsArrow(e))
);
domElements.inputMain.addEventListener('input', (e) => inputMain(e));

const init = () => {
  showInputsSecondary();
  showRecipes();
};

init();
