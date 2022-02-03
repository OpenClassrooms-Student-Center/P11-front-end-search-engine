import recipesInit from "../data";
import searchBarAlgo from "./searchAlgo";
import render from "../../index";


const searchBar = document.getElementById('inputSearch');

export function onSearchBar () {
    const results = searchBarAlgo(recipesInit, searchBar.value)
    render(results)

}

const initSearchBar = () => {
    searchBar.addEventListener('keyup', onSearchBar)
}

export default initSearchBar;
