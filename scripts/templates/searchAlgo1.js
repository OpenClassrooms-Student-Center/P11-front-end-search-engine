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
  //data- array of
  static search(
    request,
    igredientsSelected,
    appareilsSelected,
    ustensilesSelected,
    data
  ) {
    let recipesMatched = [];
    if (request.length < 3) {
      recipesMatched = data;
    } else {
      for (let recipe of data) {
        if (recipe.name.toLowerCase().includes(request)) {
          recipesMatched.push(recipe);
          continue;
          // Check if a recipe match with the requested description
        } else if (recipe.description.toLowerCase().includes(request)) {
          recipesMatched.push(recipe);
          continue;
        }

        for (let ingr of recipe.ingredients) {
          if (ingr.ingredient.toLowerCase().includes(request)) {
            recipesMatched.push(recipe);
            break;
          }
        }
      }
    }

    let recipesMatchedIngredients = [];
    for (let recipe of recipesMatched) {
      let ingContained = true;

      for (let ingSel of igredientsSelected) {
        for (let ing of recipe.ingredients) {
          // ingred current est == avec celui selecté
          if (ing.ingredient.toLowerCase() === ingSel.toLowerCase()) {
            ingContained = true;
            break;
          } else {
            ingContained = false;
          }
        }
        if (!ingContained) {
          break;
        }
      }

      let ustContained = true;
      for (let ustensilSel of ustensilesSelected) {
        for (let ust of recipe.ustensils) {
          if (ust.toLowerCase() === ustensilSel.toLowerCase()) {
            ustContained = true;
            break;
          } else {
            ustContained = false;
          }
        }
        if (!ustContained) {
          break;
        }
      }

      let applContained = true;
      for (let apareillSel of appareilsSelected) {
        if (recipe.appliance.toLowerCase() === apareillSel.toLowerCase()) {
          applContained = true;
        } else {
          applContained = false;
          break;
        }
      }

      if (ingContained && ustContained && applContained) {
        recipesMatchedIngredients.push(recipe);
      }
    }

    return recipesMatchedIngredients;
  }

  static searchText(word, setOfItems) {
    let setFoundItems = new Set();

    for (let item of setOfItems) {
      if (item.includes(word)) {
        setFoundItems.add(item);
      }
    }
    return setFoundItems;
  }
}
