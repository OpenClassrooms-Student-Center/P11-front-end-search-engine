import renderIngredients from './renderIngredients'

const getAllUniqueIngredient = (recipes) => {
    let ingredientResults = []
    recipes.forEach(recipe => {
        ingredientResults = [...ingredientResults, ...recipe.ingredients]
    })

    return [...new Set(ingredientResults.map(item => item.ingredient))];
}

const renderFilter = (recipes) => {
    let ingredients = getAllUniqueIngredient(recipes)

    renderIngredients(ingredients)

}

export default renderFilter;
