import {
  updateRecipes,
  updateRecipesWithoutInputMain,
} from '../recipes/updateRecipes.js';
import { updateTags, updateTagsWithoutInputMain } from '../tags/updateTags.js';

export const inputMain = (e) => {
  const input = e.target.value;

  if (input.length >= 3) {
    updateRecipes();
    updateTags();
    return;
  }
  updateTagsWithoutInputMain();
  updateRecipesWithoutInputMain();
};

export default inputMain;
