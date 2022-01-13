import recipesInit from "../data";
import renderRecipe from "../recipe/renderRecipe";
import searchAlgo from "./searchAlgo";
import render from "../../index";


const searchBar = document.getElementById('inputSearch');

function onSearch () {
    if (searchBar.value.length >= 3 ) {
        const results = searchAlgo(recipesInit, searchBar.value)
        render(results)
    } else if (searchBar.value.length <= 2) {
        render(recipesInit)
    }
}


const initSearch = () => {
    searchBar.addEventListener('keyup', onSearch)
}

export default initSearch;
