import renderRecipe from './recipe'
import renderFilterIngredients from './filter'


const render = (recipes) => {
    renderRecipe(recipes)

    ingredientResults = []
    recipes.forEach(recipe => {
        ingredientResults = [...ingredientResults, ...recipe.ingredients]
    })
    ingredientResults = [...new Set(ingredientResults.map(item => item.ingredient))];

    renderFilterIngredients(ingredientResults)

    return ingredientResults;
}

export default render;
