import {
  updateItems,
  updateRecipesFromMainInput,
  updateRecipesToShowAll,
} from '../recipes/updateRecipes.js';

export const inputMain = (e) => {
  const input = e.target.value;

  if (input.length >= 3) {
    const recipesUpdate = updateRecipesFromMainInput(input);
    updateItems(recipesUpdate);
    return;
  }
  updateItems(['all']);
  updateRecipesToShowAll();
};

export default inputMain;
