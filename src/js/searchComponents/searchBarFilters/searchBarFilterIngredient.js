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
        const resultsByIngre  = filterByIngredient(recipesInit, searchValue);
        let recipes =  getUniqueListBy(resultsByIngre, 'id')
        return recipes
    } else if (searchValue.length <= 2) {
        return recipesInit
    }

}

export default searchBarFilterIngredient;