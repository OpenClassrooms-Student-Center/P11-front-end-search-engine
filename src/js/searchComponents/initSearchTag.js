import recipesInit from "../data";
import searchTarAlgo from "./searchAlgo";
import render from "../../index";


const searchBar = document.getElementById('inputSearch');

export function onSearchTag () {
    const results = searchTarAlgo(recipesInit, searchTar.value)
    render(results)

}

const initSearchTag = () => {
    searchBar.addEventListener('keyup', onSearchTag)
}

export default initSearchTag;