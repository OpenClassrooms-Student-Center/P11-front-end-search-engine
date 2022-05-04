/**
 * SEARCH ALGORITHM 1
 * Here is all the logic to process a user request and return a list of corresponding recipes
 * This first algorithm has not pre-treatment of the data, the array data go throught too much
 * "for of" loops who'll only keep the corresponding recipes.
 */

export class Filter {
  /**
   * Take an user request, return a list of corresponding recipes
   * @param {string} request - text typed by the user in the input field
   * * @param {string} data -array with recipes
   * @param {string} appliance - value of the appliance <select>
   * @param {string} ustensile - value of the ustensil <select>
   * @returns {array} - array of objects (corresponding recipes)
   */

  //Search method in the first input of filter, menu of filter( name, descritption, ingredient)
  static search(request, data) {
    let recipesMatched = [];
    for (let recipe of data) {
      if (recipe.name.toLowerCase().includes(request)) {
        recipesMatched.push(recipe);
        // Check if a recipe match with the requested description
      } else if (recipe.description.toLowerCase().includes(request)) {
        recipesMatched.push(recipe);
      }
    }
    return recipesMatched;
  }
}
