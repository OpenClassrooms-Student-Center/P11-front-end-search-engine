import recipesInit from "../data";
import searchBarAlgo from "./searchAlgo";
import render from "../../index";


const searchBar = document.getElementById('inputSearch');

export function onSearch () {
    const results = searchBarAlgo(recipesInit, searchBar.value)
    render(results)

}

const initSearch = () => {
    searchBar.addEventListener('keyup', onSearch)
}

export default initSearch;
