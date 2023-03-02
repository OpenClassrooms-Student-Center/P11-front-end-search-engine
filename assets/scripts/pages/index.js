import domElements from '../domElements.js';
import clickSecondaryElementsArrow from '../actions/inputSecondary.js';
import { showInputsSecondary, showRecipes } from '../data/showData.js';

domElements.inputSecondaryIcon.forEach((icon) =>
  icon.addEventListener('click', (e) => clickSecondaryElementsArrow(e))
);

const init = () => {
  showInputsSecondary();
  showRecipes();
};

init();
