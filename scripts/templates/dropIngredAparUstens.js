import { Api } from "./scripts/api/api.js";
import { Recipe } from "./scripts/templates/Recipe.js";

export const displayIngredients =
  (this.globalData.prototype.displayIngredients = function (data, filter) {
    console.log(data, filter);

    const distinctIngredients = [
      ...new Set(
        data
          .map((recipe) =>
            recipe.ingredients.map((ingredient) =>
              ingredient.ingredient.toLowerCase().trim()
            )
          )
          .flat()
          .sort()
      ),
    ];

    // SI RECHERCHE DANS INPUT....
    if (filter) {
      // console.log(
      //   distinctIngredients.filter((ingredient) =>
      //     ingredient.includes(filter.toLowerCase().trim())
      //   )
      // );
      return distinctIngredients.filter((ingredient) =>
        ingredient.includes(filter.toLowerCase().trim())
      );
    }

    // SANS RECHERCHE
    return utils.shuffle(distinctIngredients);
  });
