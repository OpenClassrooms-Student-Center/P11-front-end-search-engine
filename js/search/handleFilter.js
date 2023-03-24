import { displayFilter } from "../factories/DisplayListFilter.js";

/**
 *
 * @param {array} array of recipes
 * @param {string} element of array to display
 * @param {string} filter key if element is an object
 * @param {string} listId id of list in DOM
 */
export const setArrayFilters = (arrayOfRecipes, element, filter, listId) => {
  let allElements = [];
  let uniqueElements = [];
  arrayOfRecipes.forEach((recipe) => {
    if (Array.isArray(recipe[element])) {
      recipe[element].forEach((subElement) => {
        allElements.push(
          typeof subElement === "object"
            ? subElement[filter].toLowerCase().trim()
            : subElement.toLowerCase().trim()
        );
      });
    } else {
      allElements.push(recipe[element]);
    }
  });
  uniqueElements = [...new Set(allElements)];
  displayFilter(uniqueElements, listId);
};



/**
 *
 * @param {string} value of input
 * @param {array} recipeArray of recipes
 * @param {string} recipeElement to filter
 * @param {string} recipeElement object key to filter the right value
 * @param {string} listId id of the list to display filter lists
 */
export const filterSearch = (
  value,
  recipesArray,
  recipeElement,
  key,
  listId
) => {
  let arrayOfFilter = [];

  // Search in recipes array and filter by value
  recipesArray.forEach((recipe) => {
    if (Array.isArray(recipe[recipeElement])) {
      recipe[recipeElement].forEach((filter) => {
        if (typeof filter === "object") {
          filter[key].toLowerCase().trim().includes(value) &&
            arrayOfFilter.push(filter[key]);
        } else {
          filter.toLowerCase().trim().includes(value) &&
            arrayOfFilter.push(filter);
        }
      });
    } else {
      recipe[recipeElement].toLowerCase().trim().includes(value) &&
        arrayOfFilter.push(recipe[recipeElement]);
    }
  });

  // Transform filter
  arrayOfFilter = arrayOfFilter.map((filter) => {
    return filter.toLowerCase();
  });
  // Sort array to have unique value
  arrayOfFilter = [...new Set(arrayOfFilter)];
  // display filter in DOM
  displayFilter(arrayOfFilter, listId);
};
