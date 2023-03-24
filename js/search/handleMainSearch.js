/**
 * 
 * @param {string} value of the input search
 * @param {array} recipesArray 
 * @returns array of filtered recipes
 */
export const searchInRecipes = (value, recipesArray) => {
  // Create a new array to stock filter recipes
  let filterByValueRecipes = [];

  if (value.length > 2) {
    for (let i = 0; i < recipesArray.length; i++) {
      // One recipe
      const recipe = recipesArray[i];

      // format name values
      const nameOfRecipes = recipe.name.toLowerCase().trim();

      // array of ingredients
      const ingredientsOfRecipes = recipe.ingredients;

      // array of ustensils
      const ustensilesOfRecipes = recipe.ustensils;

      // Search for name
      if (nameOfRecipes.includes(value)) {
        filterByValueRecipes.push(recipe);
      }

      // Search for ingredient
      for (let i = 0; i < ingredientsOfRecipes.length; i++) {
        let ingredient = ingredientsOfRecipes[i].ingredient
          .toLocaleLowerCase()
          .trim();
        ingredient.includes(value) && filterByValueRecipes.push(recipe);
      }

      // Search for ustentils
      for (let i = 0; i < ustensilesOfRecipes.length; i++) {
        let ustensile = ustensilesOfRecipes[i].toLocaleLowerCase().trim();
        ustensile.includes(value) && filterByValueRecipes.push(recipe);
      }

      //Delete recipes in double
      let uniqueRecipeInArray = [];
      for (let i = 0; i < filterByValueRecipes.length; i++) {
        let recipe = filterByValueRecipes[i];
        if (!uniqueRecipeInArray.includes(recipe)) {
          uniqueRecipeInArray.push(recipe);
        }
      }
      filterByValueRecipes = uniqueRecipeInArray;
    }
  } else {
    filterByValueRecipes = recipesArray;
  }
  
  return filterByValueRecipes;
};
