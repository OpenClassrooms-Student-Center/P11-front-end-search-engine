import recipes from '../../data/recipes.js';
import domElements from '../domElements.js';
import cleanTagsFromRecipes from './cleanTagsFromRecipes.js';

const { allIngredients, allAppliances, allUstensils } =
  cleanTagsFromRecipes(recipes);

const createTags = () => {
  domElements.inputSecondary.forEach((input) => {
    const { lastElementChild: inputLEC } = input;
    const inputSecondaryName = input.classList[1];

    let array = [];

    if (inputSecondaryName === 'ingredients') {
      array = allIngredients;
    } else if (inputSecondaryName === 'appliances') {
      array = allAppliances;
    } else if (inputSecondaryName === 'ustensils') {
      array = allUstensils;
    }

    inputLEC.replaceChildren();

    array
      .sort((a, b) => a.recurrence < b.recurrence)
      .forEach((item, index) => {
        const option = document.createElement('option');

        option.textContent =
          item.item.substring(0, 1).toUpperCase() + item.item.substring(1);
        inputLEC.appendChild(option);

        option.className = 'input-secondary-item';
        option.disabled = true;

        if (index < 30) {
          option.classList.add('show-tag');
        }
      });
  });
};

export default createTags;
