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

const searchTagAlgo = () => {
    const activeFilter = {
        ingredient: [],
        ustensil: [],
        appliance: [],
    }
    if(activeFilter.length > 0) {
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            const type = tag.getAttribute('data-type')
            const label = tag.getAttribute('data-label')
            activeFilter[type].push(label)
        })
        if (activeFilter.ingredient.length > 0) {
            recipes = filterByMultipleIngredient(recipesInit, activeFilter.ingredient);
            console.log(
                "=== active filter ingredient ===",
                recipe
            )
        }
        if (activeFilter.appliance.length > 0) {
            recipes = filterByMultipleAppliance(recipesInit, activeFilter.appliance);
        }
        if (activeFilter.ustensil.length > 0) {
            recipes = filterByMultipleUstensil(recipesInit, activeFilter.ustensil);
        }
    }

    console.log(
    "=== Active Filter ===",
    activeFilter
    )

}


export default searchTagAlgo;