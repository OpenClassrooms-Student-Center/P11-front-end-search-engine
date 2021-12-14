import recipesInit from './js/data'
import renderFilterIngredients from './js/render/filter/filter_details_ingredient'
import renderFilterAppliances from './js/render/filter/filter_details_appliance'
import renderRecipe from './js/render/recipe'
import search from './js/search'
import './js/filter_details_functions/functions'



let ingredientResults = []
let applianceResults = []

const render = (recipes) => {
    renderRecipe(recipes)

    /* ingredientResults = [] */
    recipes.forEach(recipe => {
        ingredientResults = [...ingredientResults, ...recipe.ingredients]
    })
    ingredientResults = [...new Set(ingredientResults.map(item => item.ingredient))];

    renderFilterIngredients(ingredientResults)

    recipes.forEach(recipe => {
        applianceResults = [...applianceResults, ...recipe.appliance]
        console.log(recipe.appliance)
    })
    applianceResults = [...new Set(applianceResults.map(item => item.appliance))];

    renderFilterAppliances(applianceResults)
    
    console.log('===Appliance===');
    console.log(renderFilterAppliances())
    console.log(renderFilterAppliances(applianceResults))
}

const searchBar = document.getElementById('inputSearch');
function onSearch () {
    if (searchBar.value.length >= 3 ) {
        const results = search(recipesInit, searchBar.value)

        /**** NEXT *****/
        // const currentIngredients = getIngredients(results) // ['coco', 'poulet', ...]
        // renderFilter(currentIngredients)

        searchResult = results
        render(results)
    } else if (searchBar.value.length <= 2) {
        renderRecipe(recipesInit)
    }

    console.log(ingredientResults)
}

searchBar.addEventListener('keyup', onSearch)
render(recipesInit)


