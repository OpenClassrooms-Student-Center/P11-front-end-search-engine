import { getUniqueListBy } from '../../utils'
import recipesInit from "../../data";

const searchBar = document.getElementById('inputSearch');

const filterByIngredient = (recipes, filtre) =>
    recipes.filter(recipe =>
        recipe.ingredients.find(ingredient =>
            ingredient.ingredient.toLowerCase().includes(filtre.toLowerCase()
            )
        )
    )

const searchBarFilterIngredient = () => {
    const searchValue = searchBar.value
    if (searchValue.length >= 3 ) {

            /* TODO

        - Remettre la limite de 3 carac sur la searchbar => OK maisvoir pour reset lorsque nous sommes inférieur à 2 carac
        - Trouver pourquoi le tag lait de coco ne rends que 2 element et pas 3
        - Rajouter tout les filtre (appliance & ustensilt) pour la searchbar ET les tags

            */
   
        const resultsByIngre  = filterByIngredient(recipesInit, searchValue);
        let recipes =  getUniqueListBy(resultsByIngre, 'id')

        return recipes

    } else if (searchValue.length <= 2) {

        return recipesInit
        
    }

}

export default searchBarFilterIngredient;