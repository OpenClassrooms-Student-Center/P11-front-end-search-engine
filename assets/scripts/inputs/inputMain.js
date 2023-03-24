import {
  updateRecipes,
  updateRecipesToShowAll,
} from '../recipes/updateRecipes.js';
import getTags from '../tags/getTags.js';

export const inputMain = (e) => {
  const input = e.target.value;
  const tags = getTags();

  if (input.length >= 3) {
    updateRecipes();
    return;
  }
  if (tags.length === 0) {
    updateRecipesToShowAll();
  }
};

export default inputMain;
