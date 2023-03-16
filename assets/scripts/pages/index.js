import domElements from '../domElements.js';
import {
  clickOnFields,
  clickSecondaryElementsArrow,
  clickOnInputSecondary,
} from '../actions/click.js';
import { showInputsSecondary, showRecipes } from '../data/showData.js';
import { inputMain } from '../actions/inputs.js';

domElements.inputSecondaryIcon.forEach((icon) =>
  icon.addEventListener('click', (e) => clickSecondaryElementsArrow(e))
);
domElements.inputMain.addEventListener('input', (e) => inputMain(e));

domElements.fields.addEventListener('click', (e) => clickOnFields(e));

domElements.inputSecondaryAllItems.forEach((input) => {
  input.addEventListener('click', (e) => clickOnInputSecondary(e));
});

const init = () => {
  showInputsSecondary();
  showRecipes();
};

init();
