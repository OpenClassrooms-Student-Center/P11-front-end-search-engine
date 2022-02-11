import recipesInit from "../data";

const filterByMultipleIngredient = (recipes, filterIngredients) => {
    return recipes.filter(recipe => {
        const ingredientRecipe = recipe.ingredients.map(ingredient => ingredient.ingredient)
        return filterIngredients.every(elem => ingredientRecipe.includes(elem))
    })
}

const filterByMultipleAppliance = (recipes, filterAppliances) => {
    return recipes.filter(recipe => {
        const applianceRecipe = recipe.appliance.map(appliance)
        return filterAppliances.every(elem => applianceRecipe.includes(elem))
    })
}

const filterByMultipleUstensil = (recipes, filterUstensils) => {
    return recipes.filter(recipe => {
        const ustensilRecipe = recipe.ustensils.map(ustensil => ustensil)
        return filterUstensils.every(elem => ustensilRecipe.includes(elem))
    })
}



const searchTagAlgo = (recipes) => {
    const activeFilter = {
        ingredient: [],
        ustensil: [],
        appliance: [],
    }

    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        const type = tag.getAttribute('data-type')
        const label = tag.getAttribute('data-label')
        activeFilter[type].push(label)
    })



    if(tags.length > 0) {
        let recipeFilteredByTag = []

        if (activeFilter.ingredient.length > 0) {
            recipeFilteredByTag = filterByMultipleIngredient(recipes, activeFilter.ingredient);
        }
        if (activeFilter.appliance.length > 0) {
            recipeFilteredByTag = filterByMultipleAppliance(recipes, activeFilter.appliance);
        }
        if (activeFilter.ustensil.length > 0) {
            recipeFilteredByTag = filterByMultipleUstensil(recipes, activeFilter.ustensil);
        }

        return recipeFilteredByTag;
    } else {
        return recipes;
    }
}


export default searchTagAlgo;
