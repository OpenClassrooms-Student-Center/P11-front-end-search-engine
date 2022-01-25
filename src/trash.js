/*

const searchBarIngredient = document.getElementById('filterFoodInput');

function searchIngredient () {

    const search = searchBarIngredient.value;

    if (search.length >= 3 ) {
        const ingredientFiltered = ingredientResults.filter(ingredient => ingredient.toLowerCase().includes(search.toLowerCase()))
        renderFilterIngredients(ingredientFiltered)
    }
}

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


*/
