import recipes from '../../data/recipes.js';
import domElements from '../domElements.js';
import { showElement, hideElement } from '../tools/element.js';
import isInputMainAndTagsIncludesInRecipe from './utils.js';

export const updateRecipes = () => {
  const input = domElements.inputMain.value;
  const allDomRecipes = document.querySelectorAll('.recipe');
  let isRecipe = false;

  recipes.forEach((recipe) => {
    const thisDomRecipe = Array.from(allDomRecipes).find(
      (domRecipe) => Number(domRecipe.dataset.id) === Number(recipe.id)
    );

    if (isInputMainAndTagsIncludesInRecipe(recipe, input)) {
      showElement(thisDomRecipe);
      isRecipe = true;
      return;
    }

    hideElement(thisDomRecipe);
  });

  if (!isRecipe) {
    hideElement(domElements.allRecipes);
    showElement(domElements.noRecipe);
    return;
  }

  showElement(domElements.allRecipes);
  hideElement(domElements.noRecipe);
};

export const updateRecipesToShowAll = () => {
  const allDomRecipes = document.querySelectorAll('.recipe');
  showElement(domElements.allRecipes);
  hideElement(domElements.noRecipe);

  recipes.forEach((recipe) => {
    const thisDomRecipe = Array.from(allDomRecipes).find(
      (domRecipe) => Number(domRecipe.dataset.id) === Number(recipe.id)
    );

    showElement(thisDomRecipe);
  });
};
