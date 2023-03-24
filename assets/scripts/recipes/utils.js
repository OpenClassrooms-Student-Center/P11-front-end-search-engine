import getTags from '../tags/getTags.js';

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

const isIncludesInUstensils = (recipe, input) =>
  recipe.ustensils.some(
    (ustensil) => ustensil.toLowerCase() === input.toLowerCase()
  );

const isTagsIncludesInRecipe = (tags, recipe) => {
  if (tags.length === 0) {
    return true;
  }
  let isIncludesInAllTags = true;
  tags.forEach((tag) => {
    if (
      (tag.item === 'appliances' &&
        !isIncludesInAppliances(recipe, tag.name)) ||
      (tag.item === 'ustensils' && !isIncludesInUstensils(recipe, tag.name)) ||
      (tag.item === 'ingredients' && !isIncludesInIngredients(recipe, tag.name))
    ) {
      isIncludesInAllTags = false;
    }
  });
  return isIncludesInAllTags;
};

const isInputMainAndTagsIncludesInRecipe = (recipe, input) => {
  const tags = getTags();

  return (
    (isIncludesInAppliances(recipe, input) ||
      isIncludesInDescription(recipe, input) ||
      isIncludesInIngredients(recipe, input) ||
      isIncludesInName(recipe, input) ||
      isIncludesInUstensils(recipe, input)) &&
    isTagsIncludesInRecipe(tags, recipe)
  );
};

export default isInputMainAndTagsIncludesInRecipe;
