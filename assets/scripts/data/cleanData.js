import { recipes } from '../../data/recipes.js';

function pushItemOrAddRecurrence(array, itemtoFind, itemLower) {
  const tempArray = array;
  if (!itemtoFind) {
    tempArray.push({ item: itemLower, recurrence: 1 });
  } else {
    tempArray.find((it) => it === itemtoFind).recurrence += 1;
  }
  return tempArray;
}

export default function getData() {
  let ingredients = [];
  let appliances = [];
  let ustensils = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientLower = ingredient.ingredient.toLowerCase();
      const ingredientFind = ingredients.find(
        (ing) => ing.item === ingredientLower
      );

      ingredients = pushItemOrAddRecurrence(
        ingredients,
        ingredientFind,
        ingredientLower
      );
    });

    const applianceLower = recipe.appliance.toLowerCase();
    const applianceFind = appliances.find((rec) => rec.item === applianceLower);

    appliances = pushItemOrAddRecurrence(
      appliances,
      applianceFind,
      applianceLower
    );

    recipe.ustensils.forEach((ustensil) => {
      const ustensilLower = ustensil.toLocaleLowerCase();
      const ustensilFind = ustensils.find((ust) => ust.item === ustensilLower);

      ustensils = pushItemOrAddRecurrence(
        ustensils,
        ustensilFind,
        ustensilLower
      );
    });
  });

  return { ingredients, appliances, ustensils };
}
