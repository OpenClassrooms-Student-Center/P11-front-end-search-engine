import recipesInit from './js/data'
import renderFilterIngredients from './js/render/filter'
import renderRecipe from './js/render/recipe'
import search from './js/search'
import './js/filter/index'



let ingredientResults = []

const render = (recipes) => {
    renderRecipe(recipes)

    ingredientResults = []
    recipes.forEach(recipe => {
        ingredientResults = [...ingredientResults, ...recipe.ingredients]
    })
    ingredientResults = [...new Set(ingredientResults.map(item => item.ingredient))];

    renderFilterIngredients(ingredientResults)
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


function myFunctionDropdownIngredient(event,myDropdownIngredient){
    let element = event.target;
    while(element.nodeName !== "BUTTON"){
        element = element.parentNode;
    }
    document.getElementById(myDropdownIngredient).classList.toggle("hidden");
    document.getElementById(myDropdownIngredient).classList.toggle("flex");
}

searchBar.addEventListener('keyup', onSearch)
render(recipesInit)


