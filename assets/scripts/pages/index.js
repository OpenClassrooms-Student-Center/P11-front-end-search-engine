import {
  clickOnInputSecondary,
  clickOnTags,
  clickSecondaryElementsArrow,
} from '../tags/actionTags.js';
import { inputMain } from '../inputs/inputMain.js';
import showRecipes from '../recipes/showRecipes.js';
import domElements from '../domElements.js';
import showInputsSecondary from '../tags/showTags.js';
import inputSecondary from '../inputs/inputSecondary.js';

domElements.inputMain.addEventListener('input', (e) => inputMain(e));

domElements.inputSecondary.forEach((input) =>
  input.addEventListener('input', (e) => inputSecondary(e))
);
domElements.inputSecondaryAllItems.forEach((input) => {
  input.addEventListener('click', (e) => clickOnInputSecondary(e));
});
domElements.inputSecondaryIcon.forEach((icon) =>
  icon.addEventListener('click', (e) => clickSecondaryElementsArrow(e))
);

domElements.tags.addEventListener('click', (e) => clickOnTags(e));

const init = () => {
  showInputsSecondary();
  showRecipes();
};

init();
