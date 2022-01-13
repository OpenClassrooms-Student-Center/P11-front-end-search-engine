import renderIngredients from './renderIngredients'
import renderAppliances from './renderAppliances'
import renderUstensils from './renderUstensils'


const getAllUniqueIngredient = (recipes) => {
    let ingredientResults = []
    recipes.forEach(recipe => {
        ingredientResults = [...ingredientResults, ...recipe.ingredients]
    })
    return [...new Set(ingredientResults.map(item => item.ingredient))];
}

const getAllUniqueUstensil = (recipes) => {
    let ustensilResults = []
    recipes.forEach(recipe => {
        ustensilResults = [...ustensilResults, ...recipe.ustensils]
    })

    return [...new Set(ustensilResults)];
}

const renderFilter = (recipes) => {
    let ingredients = getAllUniqueIngredient(recipes)
    renderIngredients(ingredients)

    let ustensils = getAllUniqueUstensil(recipes)
    renderUstensils(ustensils)
}

export default renderFilter;
