import recipes from '../../data/recipes.js';
import domElements from '../domElements.js';

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

const showElement = (element) => {
  if (!element.classList.contains('show')) {
    element.classList.add('show');
  }
};

const hideElement = (element) => {
  if (element.classList.contains('show')) {
    element.classList.remove('show');
  }
};

export const updateRecipesFromMainInput = (input) => {
  const allDomRecipes = document.querySelectorAll('.recipe');
  const recipesUpdate = [];
  const DOMFields = domElements.fields;
  const fields = [];
  DOMFields.childNodes.forEach((child) => {
    fields.push({ item: child.classList[1], name: child.textContent });
  });
  console.log(fields);

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

    const isFieldIncludesInRecipeFunction = () => {
      let checked = false;
      if (fields.length === 0) {
        checked = true;
        return checked;
      }
      fields.forEach((field) => {
        if (field.item === 'appliances') {
          if (isIncludesInAppliances(recipe, field.name)) {
            checked = true;
            return;
          }
        }
        if (field.item === 'ustensils') {
          if (isIncludesInUstensils(recipe, field.name)) {
            checked = true;
            return;
          }
        }
        if (field.item === 'ingredients') {
          if (isIncludesInIngredients(recipe, field.name)) {
            checked = true;
          }
        }
      });

      console.log(checked);
      return checked;
    };

    // const isFieldIncludesInRecipe = isFieldIncludesInRecipeFunction();

    if (isInputIsIncludesInRecipe && isFieldIncludesInRecipeFunction()) {
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
