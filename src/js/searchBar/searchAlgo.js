import { getUniqueListBy } from '../utils'
import recipesInit from "../data";

const searchBar = document.getElementById('inputSearch');

const filterByName = (recipes, filtre) =>
    recipes.filter(recipe => recipe.name.toLowerCase().includes(filtre.toLowerCase()))

const filterByIngredient = (recipes, filtre) =>
    recipes.filter(recipe =>
        recipe.ingredients.find(ingredient =>
            ingredient.ingredient.toLowerCase().includes(filtre.toLowerCase()
            )
        )
    )

const filterByMultipleIngredient = (recipes, filtreIngredients) => {
    return recipes.filter(recipe => {
        const ingredientRecipe = recipe.ingredients.map(ingredient => ingredient.ingredient)
        return filtreIngredients.every(elem => ingredientRecipe.includes(elem))
    })
}

const searchAlgo = () => {
    const searchValue = searchBar.value
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


    /* TODO

   - Remettre la limite de 3 carac sur la searchbar
   - Trouver pourquoi le tag lait de coco ne rends que 2 element et pas 3
   - Rajouter tout les filtre (appliance & ustensilt) pour la searchbar ET les tags

     */

    const resultsByName  = filterByName(recipesInit, searchValue);
    const resultsByIngre  = filterByIngredient(recipesInit, searchValue);
    let recipes =  getUniqueListBy(resultsByName.concat(resultsByIngre), 'id')



    if (activeFilter.ingredient.length > 0) {
        recipes = filterByMultipleIngredient(recipesInit, activeFilter.ingredient);
    }

    console.log(
        "=== Active Filter ===",
        activeFilter
    )


    console.log(
        "=== Recipes ===",
        recipes
    )

    return recipes

}


export default searchAlgo;
