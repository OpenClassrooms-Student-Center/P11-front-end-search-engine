
import recipes from './data.json';
/* ======================== START - DOM =====================  */
const searchBar = document.getElementById('inputSearch');
const searchBarIngredient = document.getElementById('filterFoodInput');
let searchResult = []
let ingredientResults = []
/* ======================== END - DOM =====================  */

/* ======================== START - Algorithme =====================  */

const filterByName = (recipes, filtre) => {
    recipes.filter(recipe => recipe.name.toLowerCase().includes(filtre.toLowerCase())
)}


const filterByIngredient = (recipes, filtre) =>{
    recipes.filter(recipe =>
        recipe.ingredients.find(ingredient =>
            ingredient.ingredient.toLowerCase().includes(filtre.toLowerCase()
        )
    )
)}


const onSearch = (recipes, search) => {
    const resultsByName  = filterByName(recipes, search);
    const resultsByIngre  = filterByIngredient(recipes, search);
    return resultsByName.concat(resultsByIngre)
}

function searchByName () {
    if (searchBar.value.length >= 3 ) {
        const results = onSearch(recipes, searchBar.value)

        /**** NEXT *****/
        // const currentIngredients = getIngredients(results) // ['coco', 'poulet', ...]
        // renderFilter(currentIngredients)

        searchResult = results
        render(results)
    } else if (searchBar.value.length <= 2) {
        renderRecipe(recipes)
    }
}

function searchIngredient () {

    const search = searchBarIngredient.value;

    if (search.length >= 3 ) {
        const ingredientFiltered = ingredientResults.filter(ingredient => ingredient.toLowerCase().includes(search.toLowerCase()))
        renderFilterIngredients(ingredientFiltered)
    }
}

