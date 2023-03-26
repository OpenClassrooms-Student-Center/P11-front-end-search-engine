

/**
 *
 * @param {array} arrayOfTags tag who are clicked
 * @param {array} arrayRecipes array of recipes
 * @param {array} filteredArray of recipes if recipes have been already filtered by tags
 * @returns {array} new array of recipes
 */
export const filterArrayByTag = (
  arrayOfTags,
  arrayRecipes,
  filteredArray = []
) => {
  // filter array to have unique elements
  const uniqueTagsArray = (arrayOfTags) => {
    const uniqueNamesSet = new Set();

    arrayOfTags.forEach((tag) => {
      if (!uniqueNamesSet.has(tag.name)) {
        uniqueNamesSet.add(tag.name.toLowerCase().trim());
      }
    });

    return Array.from(uniqueNamesSet);
  };

  const arrayOfUniqueTags = uniqueTagsArray(arrayOfTags);

  // Choose array to filter
  let arrayToFilter = filteredArray.length ? filteredArray : arrayRecipes;

  // create new array
  let recipesFilterByTag = arrayToFilter.filter((recipe) => {
    // get all ingredients
    let ingredientsArray = [];
    for (let key in recipe.ingredients) {
      let ingredientElts = recipe.ingredients[key].ingredient
        .toLowerCase()
        .trim();
      ingredientsArray.push(ingredientElts);
    }

    // get all appliance
    let appliancesArray = recipe.appliance.toLowerCase().trim();

    //get all ustentils
    let ustensilsArray = recipe.ustensils.map((ustensil) => {
      return ustensil.toLowerCase().trim();
    });

    // search in array to match tag
    return arrayOfUniqueTags.every(
      (tag) =>
        ingredientsArray.includes(tag) ||
        appliancesArray.includes(tag) ||
        ustensilsArray.includes(tag)
    );
  });

  return recipesFilterByTag;
};
