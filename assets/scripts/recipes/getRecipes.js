import recipes from '../../data/recipes.js';
import domElements from '../domElements.js';

const getRecipesShow = () => {
  const recipesShow = [];
  domElements.allRecipes.childNodes.forEach((domRecipe) => {
    if (domRecipe.classList.contains('show')) {
      recipesShow.push(
        recipes.find((recipe) => recipe.id === Number(domRecipe.dataset.id))
      );
    }
  });
  return recipesShow;
};

export default getRecipesShow;
