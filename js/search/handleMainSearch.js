/**
 * 
 * @param {string} searchTerm of the input search
 * @param {array} recipes
 * @returns array of filtered recipes
 */
export const searchInRecipes = (searchTerm, recipes) => {
  if (searchTerm.length < 3) {
    return recipes;
  }

  const formattedSearchTerm = searchTerm.toLowerCase().trim();

  return recipes.filter((recipe) => {

    const allFields = [
      recipe.name.toLowerCase(),
      recipe.description.toLowerCase(),
      recipe.appliance.toLowerCase(),
      ...recipe.ingredients.map((ingredient) =>
        ingredient.ingredient.toLowerCase()
      ),
      ...recipe.ustensils.map((ustensil) => ustensil.toLowerCase()),
    ]
    // Check if the search term is present in any of the recipe fields
    return allFields.some((field) => field.includes(formattedSearchTerm));
  });
};
