import { getUniqueListBy } from '../../utils'
import recipesInit from "../../data";

const searchBar = document.getElementById('inputSearch');

const filterByUstensil= (recipes, filtre) =>
    recipes.filter(recipe =>
        recipe.ustensils.find(ustensil =>
            ustensil.toLowerCase().includes(filtre.toLowerCase()
            )
        )
    )


const searchBarFilterIngredient = () => {
    const searchValue = searchBar.value
    if (searchValue.length >= 3 ) {

        const resultsByUstensil  = filterByUstensil(recipesInit, searchValue);
        let recipes =  getUniqueListBy(resultsByUstensil, 'id')

        return recipes

    } else if (searchValue.length <= 2) {

        return recipesInit
        
    }

}

export default searchBarFilterIngredient;