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

const filterByAppliance = (recipes, filtre) =>
recipes.filter(recipe =>
    recipe.appliance.toLowerCase().includes(filtre.toLowerCase())
)

const filterByUstensil= (recipes, filtre) =>
    recipes.filter(recipe =>
        recipe.ustensils.find(ustensil =>
            ustensil.toLowerCase().includes(filtre.toLowerCase()
            )
        )
    )
    
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

const searchAlgo = () => {
    const searchValue = searchBar.value
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
    if (searchValue.length >= 3 ) {

            /* TODO

        - Remettre la limite de 3 carac sur la searchbar => OK maisvoir pour reset lorsque nous sommes inférieur à 2 carac
        - Trouver pourquoi le tag lait de coco ne rends que 2 element et pas 3
        - Rajouter tout les filtre (appliance & ustensilt) pour la searchbar ET les tags

            */
   
        const resultsByName  = filterByName(recipesInit, searchValue);
        const resultsByIngre  = filterByIngredient(recipesInit, searchValue);
        const resultsByAppliance  = filterByAppliance(recipesInit, searchValue);
        const resultsByUstensil  = filterByUstensil(recipesInit, searchValue);
        let recipes =  getUniqueListBy(resultsByName.concat(resultsByIngre, resultsByAppliance, resultsByUstensil), 'id')

        console.log(
            "=== Recipes ===",
            recipes
        )

        return recipes

    } else if (searchValue.length <= 2) {

        return recipesInit
        
    }

}

export default searchAlgo;
