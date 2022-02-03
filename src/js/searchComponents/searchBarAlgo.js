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

const searchBarAlgo = () => {
    const searchValue = searchBar.value
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

export default searchBarAlgo;
