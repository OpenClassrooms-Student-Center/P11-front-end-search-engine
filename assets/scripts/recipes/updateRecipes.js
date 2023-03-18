import recipes from '../../data/recipes.js';
import domElements from '../domElements.js';
import { showElement, hideElement } from '../tools/element.js';

const isIncludesInName = (recipe, input) =>
  recipe.name.toLowerCase().includes(input.toLowerCase());

const isIncludesInAppliances = (recipe, input) =>
  recipe.appliance.toLowerCase().includes(input.toLowerCase());

const isIncludesInDescription = (recipe, input) =>
  recipe.description.toLowerCase().includes(input.toLowerCase());

const isIncludesInIngredients = (recipe, input) =>
  recipe.ingredients.some(
    (ingredient) => ingredient.ingredient.toLowerCase() === input.toLowerCase()
  );

const isIncludesInUstensils = (recipe, input) => {
  recipe.ustensils.some(
    (ustensil) => ustensil.toLowerCase() === input.toLowerCase()
  );
};

export const updateRecipesFromMainInput = (input) => {
  const allDomRecipes = document.querySelectorAll('.recipe');
  const recipesUpdate = [];
  const DOMTags = domElements.tags;
  const tags = [];
  DOMTags.childNodes.forEach((child) => {
    tags.push({ item: child.classList[1], name: child.textContent });
  });

  recipes.forEach((recipe) => {
    const thisDomRecipe = Array.from(allDomRecipes).find(
      (domRecipe) => Number(domRecipe.dataset.id) === Number(recipe.id)
    );
    const isInputIsIncludesInRecipe =
      isIncludesInAppliances(recipe, input) ||
      isIncludesInDescription(recipe, input) ||
      isIncludesInIngredients(recipe, input) ||
      isIncludesInName(recipe, input) ||
      isIncludesInUstensils(recipe, input);

    // const isTagIncludesInRecipeFunction = () => {
    //   let checked = false;
    //   if (tags.length === 0) {
    //     checked = true;
    //     return checked;
    //   }
    //   tags.forEach((tag) => {
    //     if (tag.item === 'appliances') {
    //       if (isIncludesInAppliances(recipe, tag.name)) {
    //         checked = true;
    //         return;
    //       }
    //     }
    //     if (tag.item === 'ustensils') {
    //       if (isIncludesInUstensils(recipe, tag.name)) {
    //         checked = true;
    //         return;
    //       }
    //     }
    //     if (tag.item === 'ingredients') {
    //       if (isIncludesInIngredients(recipe, tag.name)) {
    //         checked = true;
    //       }
    //     }
    //   });

    //   console.log(checked);
    //   return checked;
    // };

    // const isTagIncludesInRecipe = isTagIncludesInRecipeFunction();

    if (isInputIsIncludesInRecipe) {
      showElement(thisDomRecipe);
      recipesUpdate.push(recipe.id);
      return;
    }

    hideElement(thisDomRecipe);
  });
  return recipesUpdate;
};

export const updateRecipesToShowAll = () => {
  const allDomRecipes = document.querySelectorAll('.recipe');

  recipes.forEach((recipe) => {
    const thisDomRecipe = Array.from(allDomRecipes).find(
      (domRecipe) => Number(domRecipe.dataset.id) === Number(recipe.id)
    );
    showElement(thisDomRecipe);
  });
};

export const updateItems = (recipesUpdate) => {
  // console.log(recipesUpdate);
};
