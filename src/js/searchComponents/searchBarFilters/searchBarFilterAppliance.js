import { getUniqueListBy } from '../../utils'
import recipesInit from "../../data";

const searchBar = document.getElementById('inputSearch');

const filterByAppliance = (recipes, filtre) =>
recipes.filter(recipe =>
    recipe.appliance.toLowerCase().includes(filtre.toLowerCase())
)

const searchBarFilterAppliance = () => {
    const searchValue = searchBar.value
    if (searchValue.length >= 3 ) {

        const resultsByAppliance  = filterByAppliance(recipesInit, searchValue);
        let recipes =  getUniqueListBy(resultsByAppliance, 'id')

        return recipes

    } else if (searchValue.length <= 2) {

        return recipesInit
        
    }

}

export default searchBarFilterAppliance;