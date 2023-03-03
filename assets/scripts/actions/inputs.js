import recipes from '../../data/recipes.js';

function isIncludesInName(recipe, input) {
  return recipe.name.toLowerCase().includes(input.toLowerCase());
}
function isIncludesInIngredients(recipe, input) {
  return recipe.appliance.toLowerCase().includes(input.toLowerCase());
}
function isIncludesInDescription(recipe, input) {
  return recipe.description.toLowerCase().includes(input.toLowerCase());
}

export const inputMain = (e) => {
  const input = e.target.value;
  const allDomRecipes = document.querySelectorAll('.recipe');
  //   allDomRecipes.forEach((domRecipe) => console.log(domRecipe.dataset.id));
  if (input.length >= 3) {
    recipes.forEach((recipe) => {
      console.log(recipe);
      isIncludesInName(recipe, input);
      isIncludesInIngredients(recipe, input);
      isIncludesInDescription(recipe, input);
    });
  }
};

export const inputSecondary = () => {};
