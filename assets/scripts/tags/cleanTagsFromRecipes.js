const pushItemOrAddRecurrence = (array, itemtoFind, itemLower) => {
  const tempArray = array;
  if (!itemtoFind) {
    tempArray.push({ item: itemLower, recurrence: 1 });
  } else {
    tempArray.find((it) => it === itemtoFind).recurrence += 1;
  }
  return tempArray;
};

const cleanTagsFromRecipes = (recipes) => {
  let allIngredients = [];
  let allAppliances = [];
  let allUstensils = [];

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientLower = ingredient.ingredient.toLowerCase();
      const ingredientFind = allIngredients.find(
        (ing) => ing.item === ingredientLower
      );

      allIngredients = pushItemOrAddRecurrence(
        allIngredients,
        ingredientFind,
        ingredientLower
      );
    });

    const applianceLower = recipe.appliance.toLowerCase();
    const applianceFind = allAppliances.find(
      (rec) => rec.item === applianceLower
    );

    allAppliances = pushItemOrAddRecurrence(
      allAppliances,
      applianceFind,
      applianceLower
    );

    recipe.ustensils.forEach((ustensil) => {
      const ustensilLower = ustensil.toLocaleLowerCase();
      const ustensilFind = allUstensils.find(
        (ust) => ust.item === ustensilLower
      );

      allUstensils = pushItemOrAddRecurrence(
        allUstensils,
        ustensilFind,
        ustensilLower
      );
    });
  });
  return { allIngredients, allAppliances, allUstensils };
};

export default cleanTagsFromRecipes;
